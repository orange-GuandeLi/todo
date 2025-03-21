PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_Todo` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completed` integer DEFAULT false NOT NULL,
	`created_at` integer DEFAULT '"2025-03-21T04:45:45.654Z"' NOT NULL,
	`updated_at` integer DEFAULT '"2025-03-21T04:45:45.654Z"' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_Todo`("id", "title", "description", "completed", "created_at", "updated_at") SELECT "id", "title", "description", "completed", "created_at", "updated_at" FROM `Todo`;--> statement-breakpoint
DROP TABLE `Todo`;--> statement-breakpoint
ALTER TABLE `__new_Todo` RENAME TO `Todo`;--> statement-breakpoint
PRAGMA foreign_keys=ON;