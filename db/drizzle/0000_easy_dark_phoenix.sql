CREATE TABLE `Todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completed` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-03-21T04:33:29.189Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-03-21T04:33:29.189Z"' NOT NULL
);
