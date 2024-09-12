-- DropForeignKey
ALTER TABLE "CategoryToBusiness" DROP CONSTRAINT "CategoryToBusiness_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "CategoryToBusiness" ADD CONSTRAINT "CategoryToBusiness_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
