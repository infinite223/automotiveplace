import { TProjectCreate } from "@/app/utils/types/project";
import prisma from "@/lib/prisma";
import { mapTagsToPrisma } from "../../mappers/tags";
import { mapStagesToPrisma } from "../../mappers/stages";
import { Prisma } from "@prisma/client";

export async function createProject(project: TProjectCreate, authorId: string) {
  const { tags, stages, carItems, ...restProjectData } = project;

  let newProject;
  try {
    newProject = await prisma.project.create({
      data: {
        ...restProjectData,
        authorId,
        imagesUrl: "",

        isVerified: true, // TODO: to change
        stages: mapStagesToPrisma(stages ?? [], authorId),
        tagAssignments: mapTagsToPrisma(tags ?? [], authorId),
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        throw new Error(
          `Invalid reference: probably garageId "${restProjectData.garageId}" does not exist`
        );
      }
    }

    console.error("Error creating car item:", error);
    throw error;
  }

  return newProject;
}
