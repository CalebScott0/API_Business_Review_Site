/*
  Warnings:

  - You are about to drop the column `reviewCount` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `stars` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `commentCount` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `averageStars` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `reviewCount` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "reviewCount",
DROP COLUMN "stars";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "commentCount";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "averageStars",
DROP COLUMN "reviewCount";
