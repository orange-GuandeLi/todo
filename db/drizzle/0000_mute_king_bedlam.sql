CREATE TABLE `Todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completed` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-03-23T13:29:19.849Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-03-23T13:29:19.849Z"' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Todo_id_unique` ON `Todo` (`id`);