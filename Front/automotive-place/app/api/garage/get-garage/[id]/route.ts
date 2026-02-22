import { mapProjectToBasicProject } from "@/app/api/mappers/project";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getLoggedInUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { id: userId } = await context.params;

  const garage = await prisma.garage.findUnique({
    where: { authorId: userId },
    include: {
      projects: {
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
      },
      carItems: true,
      company: true,
    },
  });

  if (garage === null) {
    return NextResponse.json({ message: "Garage not found" }, { status: 402 });
  }

  const result = {
    ...garage,
    projects: garage?.projects.map((project) =>
      mapProjectToBasicProject(project, user.user.$id),
    ),
  };

  return NextResponse.json(result);
}
