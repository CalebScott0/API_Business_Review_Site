/*
  Warnings:

  - Added the required column `categoryName` to the `CategoryToBusiness` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CategoryToBusiness" ADD COLUMN     "categoryName" TEXT NOT NULL;
