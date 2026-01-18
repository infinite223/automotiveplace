import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validCarElement } from "./../../../components/createCarItem/Validation";
import { TCarItemCreate } from "@/app/utils/types/carItem";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { Status } from "@/app/utils/enums";
import { mapCarItemsToPrisma } from "../../mappers/carItems";

export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      },
    );
  }

  const carItem: TCarItemCreate = await request.json();

  let newCarItem = null;

  // TODO - change to auth user
  const author = await prisma.user.findFirst();
  const project = await prisma.project.findFirst();

  const result = validCarElement(carItem);
  const findInValidResult = result.validResults.find(
    (result) => result.valid == false,
  );

  if (findInValidResult) {
    return NextResponse.json({
      carItem: newCarItem,
      notification: CreateNotification(Status.Medium, findInValidResult.error),
    });
  }

  if (author?.id && project?.id) {
    // newCarItem = await createCarItem(carItem, author.id, project?.id);

    if (newCarItem) {
      return NextResponse.json({
        carItem: newCarItem,
        notification: CreateNotification(
          Status.Success,
          "Element został dodany pomyślnie",
        ),
      });
    }

    return NextResponse.json({
      carItem: newCarItem,
      notification: CreateNotification(Status.Medium, "Coś poszło nie tak"),
    });
  }
}

// async function createCarItem(
//   carItem: TCarItemCreate,
//   authorId: string,
//   projectId?: string
// ) {
//   const { tags, ...restCarItemData } = carItem;

//   // const tagData: Prisma.TagAssignmentUncheckedCreateWithoutCarItemInput[] =
//   //   tags?.map((tag) => ({
//   //     id: tag?.localId,
//   //     name: tag.name,

//   //     createdAt: new Date(),
//   //     updatedAt: new Date(),
//   //     authorId: tag.authorId,
//   //     projectId: tag.projectId || "",
//   //     carItemId: tag.carItemId || "",
//   //   })) || [];

//   let newCarItem;
//   try {
//     newCarItem = await prisma.carItem.create({
//       data: mapCarItemsToPrisma(carItem, "")
//     }
//     );
//   } catch (error) {
//     console.error("Error creating car item:", error);
//     throw error;
//   }

//   return newCarItem;
// }
