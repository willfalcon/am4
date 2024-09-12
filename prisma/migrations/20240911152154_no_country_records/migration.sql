/*
  Warnings:

  - You are about to drop the column `countryId` on the `Airport` table. All the data in the column will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `country` to the `Airport` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Airport" DROP CONSTRAINT "Airport_countryId_fkey";

-- AlterTable
ALTER TABLE "Airport" DROP COLUMN "countryId",
ADD COLUMN     "country" TEXT NOT NULL;

-- DropTable
DROP TABLE "Country";
