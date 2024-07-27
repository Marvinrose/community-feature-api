/*
  Warnings:

  - You are about to drop the column `category` on the `Post` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- 1. Create the new Category table first
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- 2. Insert predefined categories into the Category table
INSERT INTO "Category" ("name") VALUES 
('kidney'), 
('headache'), 
('stomachache'), 
('leg pain'), 
('malaria');

-- 3. Add the new nullable column to Post
ALTER TABLE "Post" ADD COLUMN "categoryId" INT;

-- 4. Update existing rows to assign default values
-- Assuming 'headache' is the default or adjust based on your needs
UPDATE "Post"
SET "categoryId" = (SELECT "id" FROM "Category" WHERE "name" = 'headache') 
WHERE "categoryId" IS NULL;

-- 5. Set the column to be NOT NULL if all rows have been updated
ALTER TABLE "Post" ALTER COLUMN "categoryId" SET NOT NULL;

-- 6. Drop the old category column
ALTER TABLE "Post" DROP COLUMN "category";

-- 7. Add the foreign key constraint
ALTER TABLE "Post" 
ADD CONSTRAINT "Post_categoryId_fkey" 
FOREIGN KEY ("categoryId") 
REFERENCES "Category"("id") 
ON DELETE RESTRICT 
ON UPDATE CASCADE;
