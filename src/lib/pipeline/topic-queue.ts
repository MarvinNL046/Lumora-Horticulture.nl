import fs from 'fs';
import path from 'path';
import { eq } from 'drizzle-orm';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

export interface QueuedTopic {
  topic: string;
  category: string;
  targetKeyword: string;
  searchVolume: number;
  priority: number;
  scrapeUrls?: string[];
}

interface TopicQueue {
  topics: QueuedTopic[];
}

// -------------------------------------------------------------------
// Dutch stop words — filtered out during duplicate detection
// -------------------------------------------------------------------

const STOP_WORDS = new Set([
  'de', 'het', 'een', 'van', 'voor', 'in', 'en', 'je', 'jouw', 'met',
  'is', 'op', 'hoe', 'wat', 'welke', 'beste', 'gids', '2026',
]);

// -------------------------------------------------------------------
// Normalization & matching helpers
// -------------------------------------------------------------------

/**
 * Normalize a word for matching: strip parentheses, possessives,
 * and apply basic Dutch plural/suffix stemming.
 */
function normalize(w: string): string {
  let n = w.replace(/[()]/g, '').replace(/'s$/i, '');
  // Basic Dutch stemming
  if (n.endsWith('ën')) n = n.slice(0, -2);        // kwekerijen → kwekerij (approx)
  else if (n.endsWith('en') && n.length > 4) n = n.slice(0, -2);  // pluggen → plug
  else if (n.endsWith('s') && !n.endsWith('ss') && n.length > 3) n = n.slice(0, -1);
  return n;
}

/**
 * Check if a normalized word matches any segment of a slug
 * (exact segment match only, no substring matching).
 */
function wordMatchesSlug(word: string, slug: string): boolean {
  const nWord = normalize(word);
  return slug.split('-').some((seg) => normalize(seg) === nWord);
}

// -------------------------------------------------------------------
// Fetch existing published slugs from Neon Postgres via Drizzle
// -------------------------------------------------------------------

async function getPublishedSlugs(): Promise<Set<string>> {
  try {
    const rows = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.status, 'published'));

    return new Set(rows.map((r) => r.slug));
  } catch (err) {
    console.warn('[topic-queue] Failed to fetch published slugs from DB:', err);
    return new Set();
  }
}

// -------------------------------------------------------------------
// Pick next topic from the queue
// -------------------------------------------------------------------

/**
 * Read the topic queue JSON, compare against published blog posts in
 * the database, and return the highest-priority unpublished topic.
 *
 * Duplicate detection uses significant-word matching between the
 * topic's targetKeyword / title and existing post slugs.
 */
export async function pickNextTopic(): Promise<QueuedTopic | null> {
  try {
    const queuePath = path.join(process.cwd(), 'content', 'topic-queue.json');
    if (!fs.existsSync(queuePath)) {
      console.warn('[topic-queue] Queue file not found:', queuePath);
      return null;
    }

    const queue: TopicQueue = JSON.parse(fs.readFileSync(queuePath, 'utf-8'));
    const existingSlugs = await getPublishedSlugs();
    const existingSlugList = Array.from(existingSlugs);

    // Sort by priority (1 = highest), then by searchVolume (desc)
    const sorted = [...queue.topics].sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return b.searchVolume - a.searchVolume;
    });

    for (const item of sorted) {
      // Extract significant words from targetKeyword
      const keywordWords = item.targetKeyword
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => !STOP_WORDS.has(w) && w.length > 1);

      // Extract significant words from topic title (broader match)
      const topicWords = item.topic
        .toLowerCase()
        .split(/[\s:—\-,()]+/)
        .filter((w) => !STOP_WORDS.has(w) && w.length > 2);

      // Check if any existing slug matches this topic:
      // - Keyword match: ALL keyword words match (exact topic duplicate)
      // - Topic match: 4+ words AND 50%+ ratio (broader title match)
      // - Short keywords (1-2 words): require exact match to avoid false positives
      const alreadyPublished = existingSlugList.some((slug) => {
        const keywordMatchCount = keywordWords.filter((word) => wordMatchesSlug(word, slug)).length;
        const keywordMatchRatio = keywordWords.length > 0 ? keywordMatchCount / keywordWords.length : 0;
        const topicMatchCount = topicWords.filter((word) => wordMatchesSlug(word, slug)).length;
        const topicMatchRatio = topicWords.length > 0 ? topicMatchCount / topicWords.length : 0;

        // For short keywords (1-2 words), require exact match
        if (keywordWords.length <= 2) {
          return keywordMatchRatio === 1.0;
        }

        return (keywordMatchRatio >= 0.85) || (topicMatchCount >= 4 && topicMatchRatio >= 0.5);
      });

      if (!alreadyPublished) {
        console.log(
          `[topic-queue] Next topic: "${item.topic}" (priority ${item.priority}, volume: ${item.searchVolume}, keywords: ${keywordWords.join(',')})`
        );
        return item;
      } else {
        console.log(
          `[topic-queue] Already published: "${item.topic}" (keywords: ${keywordWords.join(',')})`
        );
      }
    }

    console.log('[topic-queue] All queue topics have been published');
    return null;
  } catch (err) {
    console.warn('[topic-queue] Failed to read topic queue:', err);
    return null;
  }
}
