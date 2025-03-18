/*
  Warnings:

  - You are about to drop the column `carItemId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `postId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `Tag` table. All the data in the column will be lost.
  - You are about to drop the `_TagUserActivities` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_carItemId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_postId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_projectId_fkey";

-- DropForeignKey
ALTER TABLE "TagUserActivity" DROP CONSTRAINT "TagUserActivity_tagId_fkey";

-- DropForeignKey
ALTER TABLE "_TagUserActivities" DROP CONSTRAINT "_TagUserActivities_A_fkey";

-- DropForeignKey
ALTER TABLE "_TagUserActivities" DROP CONSTRAINT "_TagUserActivities_B_fkey";

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "carItemId",
DROP COLUMN "companyId",
DROP COLUMN "postId",
DROP COLUMN "projectId";

-- DropTable
DROP TABLE "_TagUserActivities";

-- CreateTable
CREATE TABLE "TagAssignment" (
    "id" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "postId" TEXT,
    "projectId" TEXT,
    "companyId" TEXT,
    "carItemId" TEXT,
    "userId" TEXT,
    "userActivityId" TEXT,

    CONSTRAINT "TagAssignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TagAssignment" ADD CONSTRAINT "TagAssignment_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagAssignment" ADD CONSTRAINT "TagAssignment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagAssignment" ADD CONSTRAINT "TagAssignment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagAssignment" ADD CONSTRAINT "TagAssignment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagAssignment" ADD CONSTRAINT "TagAssignment_carItemId_fkey" FOREIGN KEY ("carItemId") REFERENCES "CarItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagAssignment" ADD CONSTRAINT "TagAssignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TagAssignment" ADD CONSTRAINT "TagAssignment_userActivityId_fkey" FOREIGN KEY ("userActivityId") REFERENCES "UserActivity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
