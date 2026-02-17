import { NextResponse } from "next/server";
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
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      stages: {
        orderBy: {
          stageNumber: "asc",
        },
      },
      media: { select: { fileLocation: true } },
      _count: {
        select: { userActivity: true },
      },
    },
    orderBy: {
      userActivity: {
        _count: "desc",
      },
    },
    take: 10,
  });

  const selectedProjects: TBasicPopularProject[] = projects.map((project) => {
    const lastStage = project.stages[project.stages.length - 1]
      ? project.stages[project.stages.length - 1]
      : null;

    let stageName = "STOCK";
    if (lastStage && lastStage.stageNumber > 0) {
      stageName = "STAGE " + lastStage.stageNumber;
    }

    return {
      id: project.id,
      carMake: project.carMake,
      carModel: project.carModel,
      stageNumber: project.stages.length,
      currentHp: lastStage ? lastStage.hp : project.engineStockHp,
      currentNm: lastStage ? lastStage.nm : project.engineStockNm,
      author: project.author,
      likesCount: project._count.userActivity,
      images: project.media.map((m) => m.fileLocation),
      stageName,
    };
  });

  return NextResponse.json(selectedProjects);
}
