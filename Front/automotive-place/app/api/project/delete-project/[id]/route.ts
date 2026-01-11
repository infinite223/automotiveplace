import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Prisma } from "@prisma/client";
import { createAdminClient } from "@/lib/server/appwrite";
import { bucketId } from "@/app/utils/helpers/storageHelper";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to delete a project" },
      { status: 401 }
    );
  }
  const { storage } = await createAdminClient();

  const projectId = params.id;

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    if (project.authorId !== user.user.$id) {
      return NextResponse.json(
        { message: "You are not the owner of this project" },
        { status: 403 }
      );
    }

    const mediaFiles = await prisma.media.findMany({
      where: { projectId },
    });

    for (const media of mediaFiles) {
      try {
        await storage.deleteFile(bucketId, media.fileLocation);
      } catch (err) {
        console.error(
          `Failed to delete Appwrite file ${media.fileLocation}`,
          err
        );

        return NextResponse.json(
          {
            message:
              "Failed to delete project images. Project was NOT deleted.",
            failedFileId: media.fileLocation,
          },
          { status: 500 }
        );
      }
    }

    await prisma.$transaction(async (tx) => {
      await tx.media.deleteMany({
        where: { projectId },
      });

      await tx.stage.deleteMany({
        where: { projectId },
      });

      await tx.tagAssignment.deleteMany({
        where: { projectId },
      });

      await tx.project.delete({
        where: { id: projectId },
      });
    });

    return NextResponse.json({
      message: "Core.Project.TheProjectHasBeenSuccessfullyDeleted",
      deletedProjectId: projectId,
    });
  } catch (error) {
    console.error("Error deleting project:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: `Database error: ${error.code}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Unknown error while deleting project" },
      { status: 500 }
    );
  }
}
