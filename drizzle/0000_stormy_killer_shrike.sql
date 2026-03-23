CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(255) NOT NULL,
	"description" varchar(1000),
	"price" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grocery_items" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"purchased" boolean DEFAULT false NOT NULL,
	"priority" text DEFAULT 'medium' NOT NULL,
	"updated_at" bigint NOT NULL
);
