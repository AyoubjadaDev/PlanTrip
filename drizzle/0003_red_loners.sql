CREATE TABLE IF NOT EXISTS "partner_clicks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"trip_id" uuid,
	"partner_id" text NOT NULL,
	"link_type" text NOT NULL,
	"destination" text,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "ads_txt" text;--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "header_ad_code" text;--> statement-breakpoint
ALTER TABLE "site_settings" ADD COLUMN "sidebar_ad_code" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "partner_clicks" ADD CONSTRAINT "partner_clicks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "partner_clicks" ADD CONSTRAINT "partner_clicks_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
