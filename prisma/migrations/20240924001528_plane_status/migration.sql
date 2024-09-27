-- CreateEnum
CREATE TYPE "PlaneStatus" AS ENUM ('routed', 'groundedToHub', 'groundedToEvent', 'pending', 'maintenance');

-- AlterTable
ALTER TABLE "Plane" ADD COLUMN     "status" "PlaneStatus" NOT NULL DEFAULT 'pending';
