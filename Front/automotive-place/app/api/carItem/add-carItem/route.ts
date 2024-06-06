import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validCarElement } from "./../../../components/createCarItem/Validation";
import { TCarItemCreate } from "@/app/utils/types/carItem";
import { ICreateNotification } from "@/app/components/logger/Notification";
import { ErrorStatus } from "@/app/utils/types";
import { Prisma } from "@prisma/client";

export async function POST(request: NextRequest) {
  const authUser = false;
  const carItem: TCarItemCreate = await request.json();
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
  const project = await prisma.project.findFirst();

  const validElement = validCarElement(carItem);

  if (authUser && !validElement.valid) {
    return NextResponse.json({
      carItem: newCarItem,
      notification: validElement.notification,
    });
  }

  if (author?.id && project?.id) {
    newCarItem = createCarItem(carItem, author.id);
  }

  return NextResponse.json({ carItem: newCarItem, notification });
}

async function createCarItem(
  carItem: TCarItemCreate,
  authorId: string,
  projectId?: string
) {
  const { tags, ...restCarItemData } = carItem;

  const tagData: Prisma.TagUncheckedCreateWithoutCarItemInput[] =
    tags?.map((tag) => ({
      id: tag?.localId,
      name: tag.name,
      createdAt: new Date(),
      updatedAt: new Date(),
      authorId: tag.authorId,
      projectId: tag.projectId || "",
      carItemId: tag.carItemId || "",
    })) || [];

  let newCarItem;
  try {
    newCarItem = await prisma.carItem.create({
      data: {
        ...restCarItemData,
        authorId,
        projectId: projectId || "",
        likesCount: 0,
        tags: {
          create: tagData,
        },
      },
    });
  } catch (error) {
    console.error("Error creating car item:", error);
    throw error;
  }

  return newCarItem;
}
