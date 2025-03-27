CREATE TABLE `TodoTabel` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`completed` integer DEFAULT false NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`userID` integer NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `UserTable`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `TodoTabel_id_unique` ON `TodoTabel` (`id`);--> statement-breakpoint
CREATE TABLE `TokenTable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`token` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`userID` integer NOT NULL,
	FOREIGN KEY (`userID`) REFERENCES `UserTable`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `TokenTable_id_unique` ON `TokenTable` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `TokenTable_token_unique` ON `TokenTable` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `tokenIndex` ON `TokenTable` (`token`);--> statement-breakpoint
CREATE TABLE `UserTable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `UserTable_id_unique` ON `UserTable` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `UserTable_email_unique` ON `UserTable` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `emailIndex` ON `UserTable` (`email`);