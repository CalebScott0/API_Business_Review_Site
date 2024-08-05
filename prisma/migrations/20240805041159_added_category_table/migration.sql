/*
  Warnings:

  - The primary key for the `Business` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `business_id` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `categories` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `is_open` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `review_count` on the `Business` table. All the data in the column will be lost.
  - The primary key for the `Comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `comment_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Comment` table. All the data in the column will be lost.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `author_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `business_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `comment_count` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `review_id` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Review` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `created_at` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `review_count` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[authorId,businessId]` on the table `Review` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_review_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_business_id_fkey";

-- DropIndex
DROP INDEX "Review_author_id_business_id_key";

-- AlterTable
ALTER TABLE "Business" DROP CONSTRAINT "Business_pkey",
DROP COLUMN "business_id",
DROP COLUMN "categories",
DROP COLUMN "is_open",
DROP COLUMN "review_count",
ADD COLUMN     "id" VARCHAR(22) NOT NULL,
ADD COLUMN     "isOpen" BOOLEAN,
ADD COLUMN     "reviewCount" INTEGER,
ADD CONSTRAINT "Business_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_pkey",
DROP COLUMN "author_id",
DROP COLUMN "comment_id",
DROP COLUMN "created_at",
DROP COLUMN "review_id",
DROP COLUMN "updated_at",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" VARCHAR(22) NOT NULL,
ADD COLUMN     "reviewId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Comment_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "author_id",
DROP COLUMN "business_id",
DROP COLUMN "comment_count",
DROP COLUMN "created_at",
DROP COLUMN "review_id",
DROP COLUMN "updated_at",
ADD COLUMN     "authorId" TEXT NOT NULL,
ADD COLUMN     "businessId" TEXT NOT NULL,
ADD COLUMN     "commentCount" INTEGER,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" VARCHAR(22) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "created_at",
DROP COLUMN "review_count",
DROP COLUMN "user_id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "id" VARCHAR(22) NOT NULL,
ADD COLUMN     "reviewCount" INTEGER,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Category" (
    "id" VARCHAR(22) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CategoryToBusiness" (
    "businessId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CategoryToBusiness_businessId_categoryId_key" ON "CategoryToBusiness"("businessId", "categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_authorId_businessId_key" ON "Review"("authorId", "businessId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToBusiness" ADD CONSTRAINT "CategoryToBusiness_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryToBusiness" ADD CONSTRAINT "CategoryToBusiness_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
