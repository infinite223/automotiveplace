import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "Core.YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const { searchParams }: any = new URL(request.url);
  const projectId = searchParams.get("id");

  const project = await prisma.project.findFirst({
    where: { id: projectId.toString() },
    include: {
      tagAssignments: { include: { tag: true } },
      author: true,
      media: {
        select: { fileLocation: true },
      },
      stages: {
        orderBy: {
          stageNumber: "desc",
        },
      },
    },
  });

  const projectWithImages = {
    images: project?.media.map((m) => m.fileLocation),
    tags: project?.tagAssignments.map((ta) => ta.tag),
    ...project,
  };

  return NextResponse.json(projectWithImages);
}
