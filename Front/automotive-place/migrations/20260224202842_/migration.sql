-- CreateEnum
CREATE TYPE "VisualModificationType" AS ENUM ('FRONT_BUMPER', 'REAR_BUMPER', 'SPOILER', 'SIDE_SKIRT', 'HOOD', 'ROOF', 'WRAP', 'PAINT', 'WHEELS', 'INTERIOR', 'LIGHTING', 'OTHER');

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "visualModificationId" TEXT;

-- CreateTable
CREATE TABLE "VisualModification" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "modificationType" "VisualModificationType" NOT NULL,
    "projectId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "companyId" TEXT,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "isBlockedByAdmin" BOOLEAN,
    "reportId" TEXT,

    CONSTRAINT "VisualModification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_visualModificationId_fkey" FOREIGN KEY ("visualModificationId") REFERENCES "VisualModification"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisualModification" ADD CONSTRAINT "VisualModification_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VisualModification" ADD CONSTRAINT "VisualModification_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
