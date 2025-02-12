import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { TBasicPopularProject } from "@/app/utils/types/project";

export async function GET() {
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

  const projects = await prisma.project.findMany({
    include: {
      tags: { select: { name: true, id: true } },
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      stages: {
        orderBy: {
          stageNumber: "desc",
        },
      },
      media: { select: { fileLocation: true } },
      _count: {
        select: { likes: true },
      },
    },
    orderBy: {
      likes: {
        _count: "desc",
      },
    },
    take: 10,
  });

  const selectedProjects: TBasicPopularProject[] = projects.map((project) => {
    const lastStage = project.stages[project.stages.length - 1]
      ? project.stages[project.stages.length - 1]
      : null;

    return {
      carMake: project.carMake,
      carModel: project.carModel,
      stageNumber: project.stages.length,
      currentHp: lastStage ? lastStage.hp : project.engineStockHp,
      currentNm: lastStage ? lastStage.nm : project.engineStockNm,
      author: project.author,
      tags: project.tags,
      likesCount: project._count.likes,
      images: project.media.map((m) => m.fileLocation),
    };
  });

  return NextResponse.json(selectedProjects);
}
