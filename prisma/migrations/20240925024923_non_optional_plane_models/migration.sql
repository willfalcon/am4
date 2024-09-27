/*
  Warnings:

  - Made the column `modelId` on table `Plane` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Plane" DROP CONSTRAINT "Plane_modelId_fkey";

-- AlterTable
ALTER TABLE "Plane" ALTER COLUMN "modelId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Plane" ADD CONSTRAINT "Plane_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
