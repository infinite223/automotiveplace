import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ICreateNotification } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { ErrorStatus } from "@/app/utils/enums";
import { createProjectSchema } from "../../zod.schmas";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { TStageCreate } from "@/app/utils/types/stage";

export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const project: TProjectCreate = await request.json();
  let notification: ICreateNotification | null = {
    log: {
      date: new Date(),
      status: ErrorStatus.Low,
      title: "Coś poszło nie tak",
    },
    timer: 3000,
  };
  let newCarItem = null;

  const author = await prisma.user.findFirst();
  // TODO - change validation in all routes to zod
  const validProject = createProjectSchema.safeParse(project);

  console.log(project, "|||||", validProject.error?.errors, "validProject");
  // const result = validProject(project);
  // const findInValidResult = result.validResults.find(
  //   (result) => result.valid == false
  // );

  if (!validProject.success) {
    return NextResponse.json({
      carItem: newCarItem,
      notification: CreateNotification(
        ErrorStatus.Medium,
        validProject.error.message
      ),
    });
  }

  if (author?.id) {
    newCarItem = await createProject(project, author.id);

    if (newCarItem) {
      notification.log = {
        status: "Success",
        date: new Date(),
        title: "Projekt został dodany pomyślnie",
      };
    }
  }

  return NextResponse.json({ carItem: newCarItem, notification });
}

async function createProject(project: TProjectCreate, authorId: string) {
  const { tags, stages, carItems, ...restProjectData } = project;
  console.log(project, "project");
  // const tagData: Prisma.TagUncheckedCreateWithoutProjectInput[] =
  //   tags?.map((tag) => ({
  //     name: tag.name,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     authorId: tag.authorId,
  //     projectId: tag.projectId || "",
  //     carItemId: tag.carItemId || "",
  //   })) || [];

  let newProject;
  try {
    newProject = await prisma.project.create({
      data: {
        ...restProjectData,
        garageId: "garage2",
        authorId,
        imagesUrl: "",

        // TODO - first we need save images
        isVerified: true, // TODO: to change
        stages: mapStagesToPrisma(stages ?? [], authorId),
      },
    });
  } catch (error) {
    console.error("Error creating car item:", error);
    throw error;
  }

  return newProject;
}

function mapStagesToPrisma(stages: TStageCreate[], authorId: string) {
  if (!stages || stages.length === 0) return undefined;

  return {
    create: stages.map((s, index) => ({
      name: s.name,
      description: s.description || "",
      stageNumber: s.stageNumber ?? index + 1,
      hp: s.hp,
      nm: s.nm,
      acc_0_100: s.acc_0_100,
      acc_100_200: s.acc_100_200,
      acc_50_150: s.acc_50_150,
      sl_150_50: s.sl_150_50,
      sl_100_0: s.sl_100_0,
      stagePrice: s.stagePrice,
      maxRPM: null,
      chartImageUrl: null,
      topSpeed: null,
      weight: null,
      isBlockedByAdmin: false,
      createdById: authorId,
      createdAt: new Date(),
      updatedAt: new Date(),
      // carItems: {
      //   connect: s.carItems?.map(ci => ({ id: ci.id })) || []
      // }
    })),
  };
}
