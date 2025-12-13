import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Prisma } from "@prisma/client";

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

  const { id } = params;
  const projectId = id;
  console.log(id, "projectId");
  try {
    const project = await prisma.project.findUnique({
      where: { id },
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

    await prisma.$transaction(async (tx) => {
      const content = await tx.content.findFirst({
        where: { projectId },
      });

      if (content) {
        await tx.userContent.deleteMany({
          where: { contentId: content.id },
        });

        await tx.content.delete({
          where: { id: content.id },
        });
      }

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
      message: "Project.TheProjectHasBeenSuccessfullyDeleted",
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
