/*
  Warnings:

  - Added the required column `userId` to the `Plane` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plane" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Plane" ADD CONSTRAINT "Plane_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
