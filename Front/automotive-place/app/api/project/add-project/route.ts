import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validCarElement } from "./../../../components/createCarItem/Validation";
import { TCarItemCreate } from "@/app/utils/types/carItem";
import { ErrorStatus, ICreateNotification } from "@/app/utils/types";
import { Prisma } from "@prisma/client";
import { TProjectCreate } from "@/app/utils/types/project";

export async function POST(request: NextRequest) {
  const authUser = false;
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

  //   const validElement = validProject(project);
  //   const findInValidResult = validElement.validResults.find(
  //     (result) => result.valid == false
  //   );

  //   if (findInValidResult) {
  //     return NextResponse.json({
  //       carItem: newCarItem,
  //       notification: validElement.notification,
  //     });
  //   }

  //   if (author?.id && project?.id) {
  //     newCarItem = await createCarItem(carItem, author.id, project?.id);

  //     if (newCarItem) {
  //       notification.log = {
  //         status: "Success",
  //         date: new Date(),
  //         title: "Element został dodany pomyślnie",
  //       };
  //     }
  //   }

  return NextResponse.json({ carItem: newCarItem, notification });
}

// async function createProject(
//   carItem: TCarItemCreate,
//   authorId: string,
//   projectId?: string
// ) {
//   const { tags, ...restCarItemData } = carItem;

//   const tagData: Prisma.TagUncheckedCreateWithoutCarItemInput[] =
//     tags?.map((tag) => ({
//       id: tag?.localId,
//       name: tag.name,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       authorId: tag.authorId,
//       projectId: tag.projectId || "",
//       carItemId: tag.carItemId || "",
//     })) || [];

//   let newCarItem;
//   try {
//     newCarItem = await prisma.carItem.create({
//       data: {
//         ...restCarItemData,
//         authorId,
//         projectId: projectId || "",
//         likesCount: 0,
//         tags: {
//           create: tagData,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error creating car item:", error);
//     throw error;
//   }

//   return newCarItem;
// }
