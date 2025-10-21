import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { TProject } from "@/app/utils/types/project";
import { ProjectWithIncludes } from "../../mappers/project";
import { TCarItemBaseOnProject } from "@/app/utils/types/carItem";

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

  const project: ProjectWithIncludes | null = await prisma.project.findFirst({
    where: { id: projectId.toString() },
    include: {
      tagAssignments: { include: { tag: true } },
      author: true,
      media: {
        select: { fileLocation: true },
      },
      stages: {
        include: { carItems: true },
        orderBy: {
          stageNumber: "desc",
        },
      },
      location: {
        select: {
          name: true,
          description: true,
          lat: true,
          lng: true,
        } as const,
      } as const,
      userActivity: {
        select: { activityType: true, userId: true },
      },
    },
  });

  if (!project) {
    return NextResponse.json({});
  }

  const projectWithImages: TProject = {
    images: project.media.map((m) => m.fileLocation),
    tags: project.tagAssignments.map((i) => ({
      id: i.id,
      name: i.tag.name,
    })),
    ...project,
    name: project.name || undefined,
    description: project.description || undefined,
    engineDescription: project.engineDescription || undefined,
    engineWasSwapped: project.engineWasSwapped || false,
    engineCapacity: project.engineCapacity.toNumber() || 0,
    transmissionDescription: project.transmissionDescription || undefined,
    transmissionWasSwapped: project.transmissionWasSwapped || false,
    projectPrice: project.projectPrice.toNumber() || undefined,
    weightStock: project.weightStock?.toNumber() || undefined,
    topSpeedStock: project.topSpeedStock?.toNumber() || undefined,
    stages: project.stages.map((stage) => {
      return {
        ...stage,
        description: stage.description || undefined,
        acc_0_100: stage.acc_0_100?.toNumber() || 0,
        acc_100_200: stage.acc_100_200?.toNumber() || 0,
        acc_50_150: stage.acc_50_150?.toNumber() || 0,
        sl_150_50: stage.sl_150_50?.toNumber(),
        sl_100_0: stage.sl_100_0?.toNumber(),
        maxRPM: stage.maxRPM?.toNumber(),
        createdById: stage.createdById || "",
        stagePrice: stage.stagePrice?.toNumber(),
        chartImageUrl: stage.chartImageUrl ?? undefined,
        carItems: stage.carItems.map((carItem) => {
          return {
            date: carItem.updatedAt ?? carItem.createdAt,
            description: carItem.description,
            name: carItem.name,
            id: carItem.id,
            itemType: carItem.itemType,
          } as TCarItemBaseOnProject;
        }),
      };
    }),
    location: project.location
      ? {
          name: "Unknown",
          lat: project.location.lat.toNumber() || 0,
          lng: project.location.lng.toNumber() || 0,
          description: "",
        }
      : undefined,
    likesCount:
      project.userActivity.filter((ua) => ua.activityType === "LIKE").length ||
      0,
    isLikedByAuthUser:
      !!project?.userActivity.find((ua) => ua.userId === userData.user.$id) ||
      false,
    userId: project.authorId,
  };

  return NextResponse.json(projectWithImages);
}
