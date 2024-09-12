/*
  Warnings:

  - You are about to drop the `Line` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Line" DROP CONSTRAINT "Line_makeId_fkey";

-- AlterTable
ALTER TABLE "Manufacturer" ADD COLUMN     "lines" TEXT[];

-- DropTable
DROP TABLE "Line";
