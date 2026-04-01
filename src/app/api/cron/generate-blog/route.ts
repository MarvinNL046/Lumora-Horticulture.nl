import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { generateBlogPost } from '@/lib/pipeline/content-generator';
import { translateToGerman } from '@/lib/pipeline/translator';
import { generateBlogImage } from '@/lib/pipeline/image-generator';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

// Vercel Cron Job: Automated Bilingual Blog Generation
// Schedule: Daily (configured in vercel.json)
//
// 1. Generates a Dutch blog post via AI
// 2. Translates to German
// 3. Generates a header image
// 4. Inserts into database as published
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('Starting blog generation pipeline...');

  try {
    // Step 1: Generate Dutch blog post
    console.log('Generating Dutch blog post...');
    const post = await generateBlogPost();
    console.log(`Generated post: "${post.title}" (${post.slug})`);

    // Step 2: Translate to German
    console.log('Translating to German...');
    const german = await translateToGerman({
      title_nl: post.title,
      excerpt_nl: post.excerpt,
      content_nl: post.content,
      seo_title_nl: post.seoTitle,
      seo_description_nl: post.seoDescription,
    });
    console.log('German translation complete');

    // Step 3: Generate header image
    console.log('Generating header image...');
    const imagePath = await generateBlogImage(post.slug, post.title, post.category);
    console.log(`Image: ${imagePath || '(skipped)'}`);

    // Step 4: Insert into database
    console.log('Inserting into database...');
    await db.insert(blogPosts).values({
      slug: post.slug,
      title_nl: post.title,
      excerpt_nl: post.excerpt,
      content_nl: post.content,
      seo_title_nl: post.seoTitle,
      seo_description_nl: post.seoDescription,
      title_de: german.title_de,
      excerpt_de: german.excerpt_de,
      content_de: german.content_de,
      seo_title_de: german.seo_title_de,
      seo_description_de: german.seo_description_de,
      category: post.category,
      tags: post.tags,
      featured_image: imagePath,
      author: 'Lumora Team',
      status: 'published',
      published_at: new Date(),
    });

    console.log(`Blog post "${post.slug}" published successfully`);

    return NextResponse.json({
      success: true,
      slug: post.slug,
      title_nl: post.title,
      title_de: german.title_de,
      category: post.category,
      image: imagePath || null,
    });
  } catch (error) {
    console.error('Blog generation failed:', error);
    return NextResponse.json(
      {
        error: 'Blog generation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
