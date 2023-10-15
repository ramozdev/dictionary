ALTER TABLE `definitions` DROP CONSTRAINT `definitions_idiom_unique`;--> statement-breakpoint
ALTER TABLE `definitions` MODIFY COLUMN `idiom` varchar(191);