/**
 * Add SEO Landing Pages and CTA Tracking tables
 *
 * This script creates three new tables:
 * 1. seo_pages - Stores metadata about generated SEO landing pages
 * 2. cta_queries - Tracks all CTAs on SEO pages
 * 3. cta_clicks - Records user clicks on CTAs for conversion tracking
 */
import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addSeoCtaTables() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found in .env.local');
    process.exit(1);
  }

  console.log('🚀 Adding SEO Landing Pages and CTA Tracking tables...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Create seo_pages table
    console.log('📄 Creating seo_pages table...');
    await sql`
      CREATE TABLE IF NOT EXISTS seo_pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        pillar TEXT NOT NULL,
        subpillar TEXT NOT NULL,
        slug_nl TEXT NOT NULL UNIQUE,
        slug_en TEXT NOT NULL UNIQUE,
        slug_de TEXT NOT NULL UNIQUE,
        pillar_number NUMERIC(2, 0) NOT NULL,
        subpillar_number NUMERIC(2, 0) NOT NULL,
        status TEXT DEFAULT 'draft' NOT NULL,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ seo_pages table created\n');

    // Create cta_queries table
    console.log('🎯 Creating cta_queries table...');
    await sql`
      CREATE TABLE IF NOT EXISTS cta_queries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        seo_page_id UUID NOT NULL REFERENCES seo_pages(id) ON DELETE CASCADE,
        page_slug TEXT NOT NULL,
        locale TEXT NOT NULL,
        cta_text_nl TEXT,
        cta_text_en TEXT,
        cta_text_de TEXT,
        cta_type TEXT NOT NULL,
        cta_position TEXT NOT NULL,
        cta_action TEXT NOT NULL,
        target_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ cta_queries table created\n');

    // Create cta_clicks table
    console.log('📊 Creating cta_clicks table...');
    await sql`
      CREATE TABLE IF NOT EXISTS cta_clicks (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        cta_query_id UUID NOT NULL REFERENCES cta_queries(id) ON DELETE CASCADE,
        user_id TEXT,
        session_id TEXT,
        clicked_at TIMESTAMP DEFAULT NOW(),
        referrer TEXT,
        user_agent TEXT,
        converted BOOLEAN DEFAULT false,
        conversion_order_id UUID REFERENCES orders(id)
      )
    `;
    console.log('✅ cta_clicks table created\n');

    // Create indexes for better query performance
    console.log('⚡ Creating indexes...');

    await sql`
      CREATE INDEX IF NOT EXISTS idx_seo_pages_pillar
      ON seo_pages(pillar_number, subpillar_number)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_seo_pages_status
      ON seo_pages(status)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_cta_queries_page
      ON cta_queries(seo_page_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_cta_queries_locale
      ON cta_queries(locale)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_cta_clicks_query
      ON cta_clicks(cta_query_id)
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_cta_clicks_converted
      ON cta_clicks(converted)
    `;

    console.log('✅ All indexes created\n');

    console.log('✨ Database migration completed successfully!\n');
    console.log('📋 Summary:');
    console.log('  ✓ seo_pages table - Stores 50 SEO landing page metadata');
    console.log('  ✓ cta_queries table - Tracks ~125 CTAs across all pages');
    console.log('  ✓ cta_clicks table - Records user interactions for analytics');
    console.log('  ✓ Performance indexes - Optimized queries\n');
    console.log('🎯 Ready to generate 50 SEO landing pages with CTA tracking!\n');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.error('');
    process.exit(1);
  }
}

addSeoCtaTables();
