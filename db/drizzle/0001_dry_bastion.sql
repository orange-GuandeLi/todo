PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_TodoTabel` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completed` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`userID` integer,
	FOREIGN KEY (`userID`) REFERENCES `UserTable`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_TodoTabel`("id", "title", "description", "completed", "createdAt", "updatedAt", "userID") SELECT "id", "title", "description", "completed", "createdAt", "updatedAt", "userID" FROM `TodoTabel`;--> statement-breakpoint
DROP TABLE `TodoTabel`;--> statement-breakpoint
ALTER TABLE `__new_TodoTabel` RENAME TO `TodoTabel`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `TodoTabel_id_unique` ON `TodoTabel` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `TokenTable_content_unique` ON `TokenTable` (`content`);--> statement-breakpoint
CREATE UNIQUE INDEX `contentIndex` ON `TokenTable` (`content`);