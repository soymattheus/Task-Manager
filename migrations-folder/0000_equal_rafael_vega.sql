CREATE TABLE "tasks" (
	"id_task" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tasks_id_task_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"status" varchar(20) NOT NULL,
	"id_user" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id_user" varchar PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" char(1) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_id_user_users_id_user_fk" FOREIGN KEY ("id_user") REFERENCES "public"."users"("id_user") ON DELETE cascade ON UPDATE no action;