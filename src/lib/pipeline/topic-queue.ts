import fs from 'fs';
import path from 'path';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/../convex/_generated/api';

// -------------------------------------------------------------------
// Types
// -------------------------------------------------------------------

export interface QueuedTopic {
  topic: string;
  category: string;
  targetKeyword: string;
  searchVolume: number;
  priority: number;
}

interface TopicQueue {
  topics: QueuedTopic[];
}

// -------------------------------------------------------------------
// Dutch stop words
// -------------------------------------------------------------------

const STOP_WORDS = new Set([
  'de', 'het', 'een', 'van', 'voor', 'in', 'en', 'je', 'jouw', 'met',
  'is', 'op', 'hoe', 'wat', 'welke', 'beste', 'gids', '2026', '2025',
  'die', 'dat', 'aan', 'om', 'te', 'bij', 'naar', 'ook', 'nog', 'meer',
]);

// -------------------------------------------------------------------
// Word normalization (basic Dutch stemming)
// -------------------------------------------------------------------

function normalize(word: string): string {
  let w = word.toLowerCase().replace(/[^a-z0-9]/g, '');
  // Basic Dutch stemming
  if (w.endsWith('en') && w.length > 4) w = w.slice(0, -2);
  else if (w.endsWith('s') && w.length > 3) w = w.slice(0, -1);
  return w;
}

function getSignificantWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(w => w.length > 1 && !STOP_WORDS.has(w))
    .map(normalize);
}

// -------------------------------------------------------------------
// Duplicate detection
// -------------------------------------------------------------------

function isDuplicate(keyword: string, existingSlugs: string[]): boolean {
  const topicWords = getSignificantWords(keyword);
  if (topicWords.length === 0) return false;

  for (const slug of existingSlugs) {
    const slugSegments = slug.split('-').filter(s => s.length > 1 && !STOP_WORDS.has(s)).map(normalize);
    const matches = topicWords.filter(w =>
      slugSegments.some(s => s === w || s.startsWith(w) || w.startsWith(s))
    );
    const ratio = matches.length / topicWords.length;

    if (topicWords.length <= 2 && ratio === 1) return true;
    if (topicWords.length >= 3 && ratio >= 0.85) return true;
    if (topicWords.length >= 4 && matches.length >= 4 && ratio >= 0.5) return true;
  }
  return false;
}

// -------------------------------------------------------------------
// Pick next topic
// -------------------------------------------------------------------

export async function pickNextTopic(): Promise<QueuedTopic | null> {
  // Read topic queue
  const queuePath = path.join(process.cwd(), 'content', 'topic-queue.json');
  const queue: TopicQueue = JSON.parse(fs.readFileSync(queuePath, 'utf8'));

  // Get existing slugs from Convex
  const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  const existingPosts = await client.query(api.blogPosts.listPublished, {});
  const existingSlugs = existingPosts.map((p: { slug: string }) => p.slug);

  // Sort by priority (asc) then search volume (desc)
  const sorted = [...queue.topics].sort((a, b) =>
    a.priority !== b.priority ? a.priority - b.priority : b.searchVolume - a.searchVolume
  );

  // Find first non-duplicate topic
  for (const topic of sorted) {
    if (!isDuplicate(topic.targetKeyword, existingSlugs)) {
      return topic;
    }
  }

  return null;
}
