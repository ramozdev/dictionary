CREATE TABLE `abbreviations` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`abbreviation` varchar(191) NOT NULL,
	CONSTRAINT `abbreviations_id` PRIMARY KEY(`id`),
	CONSTRAINT `abbreviations_abbreviation_unique` UNIQUE(`abbreviation`)
);
--> statement-breakpoint
CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` text,
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `antonyms` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`antonym` varchar(191) NOT NULL,
	CONSTRAINT `antonyms_id` PRIMARY KEY(`id`),
	CONSTRAINT `antonyms_antonym_unique` UNIQUE(`antonym`)
);
--> statement-breakpoint
CREATE TABLE `definitions` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`definition` text NOT NULL,
	`idiom` varchar(191) NOT NULL,
	`slangId` bigint NOT NULL,
	`pos` varchar(20),
	CONSTRAINT `definitions_id` PRIMARY KEY(`id`),
	CONSTRAINT `definitions_idiom_unique` UNIQUE(`idiom`)
);
--> statement-breakpoint
CREATE TABLE `examples` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`example` text NOT NULL,
	`definitionId` bigint NOT NULL,
	CONSTRAINT `examples_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `slangs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`slang` varchar(191) NOT NULL,
	`slug` varchar(191) NOT NULL,
	`createdAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`explicit` boolean DEFAULT false,
	`diminutive` varchar(191),
	`augmentative` varchar(191),
	`userId` varchar(255) NOT NULL,
	CONSTRAINT `slangs_id` PRIMARY KEY(`id`),
	CONSTRAINT `slangs_slang_unique` UNIQUE(`slang`),
	CONSTRAINT `slangs_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `spellings` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`spelling` varchar(191) NOT NULL,
	`slangId` bigint NOT NULL,
	CONSTRAINT `spellings_id` PRIMARY KEY(`id`),
	CONSTRAINT `spellings_spelling_unique` UNIQUE(`spelling`)
);
--> statement-breakpoint
CREATE TABLE `synonyms` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`synonym` varchar(191) NOT NULL,
	CONSTRAINT `synonyms_id` PRIMARY KEY(`id`),
	CONSTRAINT `synonyms_synonym_unique` UNIQUE(`synonym`)
);
--> statement-breakpoint
CREATE TABLE `tags` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`tag` varchar(191) NOT NULL,
	CONSTRAINT `tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `tags_tag_unique` UNIQUE(`tag`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT CURRENT_TIMESTAMP(3),
	`image` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token` PRIMARY KEY(`identifier`,`token`),
	CONSTRAINT `verificationToken_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE INDEX `userId_idx` ON `account` (`userId`);--> statement-breakpoint
CREATE INDEX `userId_idx` ON `session` (`userId`);--> statement-breakpoint
CREATE INDEX `email_idx` ON `user` (`email`);