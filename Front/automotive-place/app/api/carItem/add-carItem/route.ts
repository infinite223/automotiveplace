import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validCarElement } from "./../../../components/createCarItem/Validation";
import { TCarItemCreate } from "@/app/utils/types/carItem";
import { ICreateNotification } from "@/app/components/logger/Notification";
import { ErrorStatus } from "@/app/utils/types";

export async function POST(request: NextRequest) {
  const authUser = false;
  const carItem: TCarItemCreate = await request.json();
  let newCarItem = null;
  let notification: ICreateNotification | null = {
    log: {
      date: new Date(),
      status: ErrorStatus.Low,
      title: "Coś poszło nie tak",
    },
    timer: 3000,
  };

  const author = await prisma.user.findFirst();
  const project = await prisma.project.findFirst();
  console.log(author?.id && project?.id);

  const validElement = validCarElement(carItem);

  if (authUser && !validElement.valid) {
    return NextResponse.json({
      carItem: newCarItem,
      notification: validElement.notification,
    });
  }

  if (author?.id && project?.id) {
    newCarItem = await prisma.carItem.create({
      data: {
        ...carItem,
        authorId: author?.id,
        projectId: project?.id,
        likesCount: 0,
      },
    });

    if (newCarItem) {
      notification = {
        log: {
          date: new Date(),
          status: "Success",
          title: "Udało się dodać elementu",
          message: validElement.error,
        },
        timer: 3000,
      };
    }
  }

  return NextResponse.json({ carItem: newCarItem, notification });
}
