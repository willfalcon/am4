/*
  Warnings:

  - Added the required column `market` to the `Airport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runway` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Airport" ADD COLUMN     "market" INTEGER NOT NULL,
ADD COLUMN     "runway" INTEGER NOT NULL;
