/*
  Warnings:

  - A unique constraint covering the columns `[mediaId]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "mediaId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Location_mediaId_key" ON "Location"("mediaId");

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
