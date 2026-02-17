import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { TBasicProject } from "@/app/utils/types/project";
import { mapProjectToBasicProject } from "../../mappers/project";

export async function GET(request: NextRequest) {
  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 0;

  const projects = await prisma.project.findMany({
    take: limit + 1,
    skip: page * limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: { select: { id: true, name: true } },
      stages: { orderBy: { stageNumber: "asc" } },
      media: true,
      userActivity: true,
      tagAssignments: { include: { tag: true } },
    },
  });

  let hasMore = false;
  if (projects.length > limit) {
    hasMore = true;
    projects.pop();
  }

  const data: TBasicProject[] = projects.map((project) =>
    mapProjectToBasicProject(project, userData.user.$id)
  );

  return NextResponse.json({
    data,
    hasMore,
    page,
  });
}
