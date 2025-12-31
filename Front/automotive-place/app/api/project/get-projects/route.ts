import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { TBasicProject } from "@/app/utils/types/project";

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

  const data: TBasicProject[] = projects.map((project) => {
    const lastStage =
      project.stages.length > 0
        ? project.stages[project.stages.length - 1]
        : null;

    return {
      id: project.id,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      forSell: project.forSell,
      isVisible: project.isVisible,

      name: project.name ?? null,
      carMake: project.carMake,
      carModel: project.carModel,
      description: project.description ?? null,
      isVerified: project.isVerified,

      hp: lastStage ? lastStage.hp : project.engineStockHp,
      nm: lastStage ? lastStage.nm : project.engineStockNm,
      engineStockHp: project.engineStockHp,
      engineStockNm: project.engineStockNm,

      acc_0_100: lastStage?.acc_0_100 ? lastStage.acc_0_100.toNumber() : null,
      acc_100_200: lastStage?.acc_100_200
        ? lastStage.acc_100_200.toNumber()
        : null,

      stageNumber: project.stages.length,

      engineNameAndCapacity: project.engineName + " " + project.engineCapacity,

      isLikedByAuthUser: !!project.userActivity.find(
        (ua) => ua.userId === userData.user.$id && ua.activityType === "LIKE"
      ),

      likesCount: project.userActivity.length,

      images: project.media.map((m) => m.fileLocation),

      tags: project.tagAssignments.map((ta) => ({
        id: ta.tag.id,
        name: ta.tag.name,
      })),

      author: {
        id: project.author.id,
        name: project.author.name,
      },
    };
  });
  console.log(data, "data");
  return NextResponse.json({
    data,
    hasMore,
    page,
  });
}
