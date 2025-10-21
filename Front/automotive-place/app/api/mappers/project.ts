import { TProject } from "@/app/utils/types/project";
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
