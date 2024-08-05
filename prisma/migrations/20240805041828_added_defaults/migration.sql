/*
  Warnings:

  - Made the column `stars` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reviewCount` on table `Business` required. This step will fail if there are existing NULL values in that column.
  - Made the column `commentCount` on table `Review` required. This step will fail if there are existing NULL values in that column.
  - Made the column `reviewCount` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "stars" SET NOT NULL,
ALTER COLUMN "stars" SET DEFAULT 0.0,
ALTER COLUMN "reviewCount" SET NOT NULL,
ALTER COLUMN "reviewCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "commentCount" SET NOT NULL,
ALTER COLUMN "commentCount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "averageStars" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ALTER COLUMN "reviewCount" SET NOT NULL,
ALTER COLUMN "reviewCount" SET DEFAULT 0;
