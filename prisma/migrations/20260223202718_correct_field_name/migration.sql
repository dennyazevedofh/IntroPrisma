/*
  Warnings:

  - You are about to drop the column `sbtitle` on the `post` table. All the data in the column will be lost.
  - Added the required column `subtitle` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `post` DROP COLUMN `sbtitle`,
    ADD COLUMN `subtitle` VARCHAR(191) NOT NULL;
