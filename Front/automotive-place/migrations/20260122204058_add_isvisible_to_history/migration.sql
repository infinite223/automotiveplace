/*
  Warnings:

  - Added the required column `isVisible` to the `ProjectHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectHistory" ADD COLUMN     "isVisible" BOOLEAN NOT NULL;
