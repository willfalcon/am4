-- DropForeignKey
ALTER TABLE "Plane" DROP CONSTRAINT "Plane_modelId_fkey";

-- DropForeignKey
ALTER TABLE "Plane" DROP CONSTRAINT "Plane_routeId_fkey";

-- AlterTable
ALTER TABLE "Plane" ALTER COLUMN "modelId" DROP NOT NULL,
ALTER COLUMN "routeId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Plane" ADD CONSTRAINT "Plane_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plane" ADD CONSTRAINT "Plane_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE SET NULL ON UPDATE CASCADE;
