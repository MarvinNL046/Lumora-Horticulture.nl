CREATE TABLE "abandoned_carts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text,
	"customer_email" text NOT NULL,
	"customer_name" text,
	"cart_data" json NOT NULL,
	"total_amount" numeric(10, 2) NOT NULL,
	"locale" text DEFAULT 'nl',
	"created_at" timestamp DEFAULT now(),
	"reminded_at" timestamp,
	"recovered" boolean DEFAULT false,
	"recovered_at" timestamp,
	"recovery_order_id" uuid
);
--> statement-breakpoint
CREATE TABLE "blog_posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title_nl" text NOT NULL,
	"excerpt_nl" text NOT NULL,
	"content_nl" text NOT NULL,
	"seo_title_nl" text,
	"seo_description_nl" text,
	"title_de" text,
	"excerpt_de" text,
	"content_de" text,
	"seo_title_de" text,
	"seo_description_de" text,
	"category" text NOT NULL,
	"tags" json DEFAULT '[]'::json,
	"featured_image" text,
	"author" text DEFAULT 'Lumora Team',
	"status" text DEFAULT 'draft',
	"published_at" timestamp,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "blog_posts_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "cta_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cta_query_id" uuid NOT NULL,
	"user_id" text,
	"session_id" text,
	"clicked_at" timestamp DEFAULT now(),
	"referrer" text,
	"user_agent" text,
	"converted" boolean DEFAULT false,
	"conversion_order_id" uuid
);
--> statement-breakpoint
CREATE TABLE "cta_queries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"seo_page_id" uuid NOT NULL,
	"page_slug" text NOT NULL,
	"locale" text NOT NULL,
	"cta_text_nl" text,
	"cta_text_en" text,
	"cta_text_de" text,
	"cta_type" text NOT NULL,
	"cta_position" text NOT NULL,
	"cta_action" text NOT NULL,
	"target_url" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "saved_addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"street" text NOT NULL,
	"city" text NOT NULL,
	"postal_code" text NOT NULL,
	"country" text DEFAULT 'NL' NOT NULL,
	"phone" text,
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "seo_pages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pillar" text NOT NULL,
	"subpillar" text NOT NULL,
	"slug_nl" text NOT NULL,
	"slug_en" text NOT NULL,
	"slug_de" text NOT NULL,
	"pillar_number" numeric(2, 0) NOT NULL,
	"subpillar_number" numeric(2, 0) NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"published_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "seo_pages_slug_nl_unique" UNIQUE("slug_nl"),
	CONSTRAINT "seo_pages_slug_en_unique" UNIQUE("slug_en"),
	CONSTRAINT "seo_pages_slug_de_unique" UNIQUE("slug_de")
);
--> statement-breakpoint
ALTER TABLE "orders" DROP CONSTRAINT "orders_order_number_unique";--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "order_number" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "user_id" text;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "locale" text DEFAULT 'nl';--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "recovery_email_sent_at" timestamp;--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "recovery_attempts" numeric(2, 0) DEFAULT '0';--> statement-breakpoint
ALTER TABLE "abandoned_carts" ADD CONSTRAINT "abandoned_carts_recovery_order_id_orders_id_fk" FOREIGN KEY ("recovery_order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cta_clicks" ADD CONSTRAINT "cta_clicks_cta_query_id_cta_queries_id_fk" FOREIGN KEY ("cta_query_id") REFERENCES "public"."cta_queries"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cta_clicks" ADD CONSTRAINT "cta_clicks_conversion_order_id_orders_id_fk" FOREIGN KEY ("conversion_order_id") REFERENCES "public"."orders"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cta_queries" ADD CONSTRAINT "cta_queries_seo_page_id_seo_pages_id_fk" FOREIGN KEY ("seo_page_id") REFERENCES "public"."seo_pages"("id") ON DELETE no action ON UPDATE no action;