CREATE TABLE IF NOT EXISTS "customers" (
	"id" serial PRIMARY KEY NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"first_name" varchar(50),
	"title" varchar(25),
	"phone" varchar(25),
	"email" varchar(50),
	"street" varchar(50),
	"zip_code" varchar(25),
	"locality" varchar(100),
	"country" varchar(25) DEFAULT 'CH',
	"website" varchar(50),
	"company" varchar(50),
	"department" varchar(50),
	"salutation" text,
	"language" "char" DEFAULT 'DE',
	"job" varchar(25),
	"notes" text,
	"po_box" varchar(25),
	"address" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"full_text" text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "full_text_index" ON "customers" USING gin (to_tsvector('german', "full_text"));