-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;
