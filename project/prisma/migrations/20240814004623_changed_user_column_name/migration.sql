/*
  Warnings:

  - You are about to drop the column `averageStars` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "averageStars",
ADD COLUMN     "stars" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
