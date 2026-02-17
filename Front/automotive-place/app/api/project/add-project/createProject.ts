import { TProjectCreate } from "@/app/utils/types/project";
import prisma from "@/lib/prisma";
import { mapTagsToPrisma } from "../../mappers/tags";
import { mapStagesToPrisma } from "../../mappers/stages";
import { Prisma } from "@prisma/client";
import { mapManyHistoryToPrisma } from "../../mappers/history";

export async function createProject(
  project: TProjectCreate,
  authorId: string,
  garageId: string,
) {
  const { tags, stages, carItems, history, ...restProjectData } = project;

  let newProject;
  try {
    newProject = await prisma.project.create({
      data: {
        ...restProjectData,
        garageId,
        authorId,
        imagesUrl: "",

        isVerified: true, // TODO: to change
        stages: mapStagesToPrisma(stages ?? [], authorId),
        tagAssignments: mapTagsToPrisma(tags ?? [], authorId),
        history: mapManyHistoryToPrisma(history ?? [], authorId),
      },
      include: {
        author: { select: { id: true, name: true } },
        stages: { orderBy: { stageNumber: "asc" } },
        media: true,
        userActivity: true,
        tagAssignments: { include: { tag: true } },
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        throw new Error(
          `Invalid reference: probably garageId "${garageId}" does not exist`,
        );
      }
    }

    console.error("Error creating car item:", error);
    throw error;
  }

  return newProject;
}
