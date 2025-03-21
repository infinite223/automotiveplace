import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ICreateNotification } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { ErrorStatus } from "@/app/utils/enums";
import { createProjectSchema } from "../../zod.schmas";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";

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
        title: "Element został dodany pomyślnie",
      };
    }
  }

  return NextResponse.json({ carItem: newCarItem, notification });
}

async function createProject(project: TProjectCreate, authorId: string) {
  const { tags, stages, carItems, ...restProjectData } = project;

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
    // newProject = await prisma.project.create({
    //   data: {
    //     ...restProjectData,
    //     garageId: "",
    //     authorId: "",
    //     imagesUrl: "",
    //     // TODO - first we need save images
    //     isVerified: false,
    //   },
    // });
  } catch (error) {
    console.error("Error creating car item:", error);
    throw error;
  }

  return newProject;
}
