import { TBasicProject, TProject } from "@/app/utils/types/project";
import { Project, TagAssignment, Stage, User, CarItem } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { mapTags } from "./tags";
import { mapStages } from "./stages";
import { mapLocation } from "./location";

export type ProjectWithIncludes = Project & {
  media: {
    fileLocation: string;
  }[];
  author: User;
  stages: (Stage & {
    carItems: CarItem[];
  })[];
  tagAssignments: (TagAssignment & {
    tag: {
      id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
      authorId: string;
      isBlockedByAdmin: boolean | null;
      reportId: string | null;
    };
  })[];
  userActivity: {
    activityType: string;
    userId: string;
  }[];
  location: {
    name: string;
    description: string;
    lat: Decimal;
    lng: Decimal;
  } | null;
};

export function mapProject(
  project: ProjectWithIncludes,
  userId: string
): TProject {
  return {
    images: project.media.map((m) => m.fileLocation),
    tags: mapTags(project.tagAssignments),
    ...project,
    name: project.name || undefined,
    description: project.description || undefined,
    engineDescription: project.engineDescription || undefined,
    engineWasSwapped: project.engineWasSwapped || false,
    engineCapacity: project.engineCapacity?.toNumber?.() || 0,
    transmissionName: project.transmissionName || undefined,
    transmissionDescription: project.transmissionDescription || undefined,
    transmissionWasSwapped: project.transmissionWasSwapped || false,
    projectPrice: project.projectPrice?.toNumber?.() || undefined,
    weightStock: project.weightStock?.toNumber?.() || undefined,
    topSpeedStock: project.topSpeedStock?.toNumber?.() || undefined,
    stages: mapStages(project.stages),
    location: mapLocation(project.location),
    likesCount:
      project.userActivity.filter((ua) => ua.activityType === "LIKE").length ||
      0,
    isLikedByAuthUser: !!project.userActivity.find(
      (ua) => ua.userId === userId
    ),
    userId: project.authorId,
  };
}

type ProjectWithRelations = Project & {
  author: { id: string; name: string };
  stages: any[];
  media: any[];
  userActivity?: any[];
  tagAssignments?: { tag: { id: string; name: string } }[];
};

export const mapProjectToBasicProject = (
  project: ProjectWithRelations,
  authUserId?: string
): TBasicProject => {
  const lastStage =
    project.stages?.length > 0
      ? project.stages[project.stages.length - 1]
      : null;

  return {
    id: project.id,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,

    forSell: project.forSell,
    isVisible: project.isVisible,
    isVerified: project.isVerified,

    name: project.name ?? null,
    carMake: project.carMake,
    carModel: project.carModel,
    description: project.description ?? null,

    hp: lastStage?.hp ?? project.engineStockHp,
    nm: lastStage?.nm ?? project.engineStockNm,
    engineStockHp: project.engineStockHp,
    engineStockNm: project.engineStockNm,

    acc_0_100: lastStage?.acc_0_100?.toNumber?.() ?? null,
    acc_100_200: lastStage?.acc_100_200?.toNumber?.() ?? null,

    stageNumber: lastStage?.stageNumber ?? 0,

    engineNameAndCapacity: `${project.engineName} ${project.engineCapacity}`,

    isLikedByAuthUser: authUserId
      ? !!project.userActivity?.find(
          (ua) => ua.userId === authUserId && ua.activityType === "LIKE"
        )
      : false,

    likesCount: project.userActivity?.length ?? 0,

    images:
      project.media
        ?.filter((m) => !m.fileName.toLowerCase().includes("dyno"))
        .map((m) => m.fileLocation) ?? [],

    tags:
      project.tagAssignments?.map((ta) => ({
        id: ta.tag.id,
        name: ta.tag.name,
      })) ?? [],

    author: {
      id: project.author.id,
      name: project.author.name,
    },
  };
};
