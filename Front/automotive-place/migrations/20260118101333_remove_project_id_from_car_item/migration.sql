/*
  Warnings:

  - You are about to drop the column `projectId` on the `CarItem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CarItem" DROP CONSTRAINT "CarItem_projectId_fkey";

-- AlterTable
ALTER TABLE "CarItem" DROP COLUMN "projectId";

-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "transmissionName" DROP NOT NULL;
