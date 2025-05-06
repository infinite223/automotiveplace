import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ICreateNotification } from "@/app/utils/types";
import { TProjectCreate } from "@/app/utils/types/project";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { ErrorStatus } from "@/app/utils/enums";
import { createProjectSchema } from "../../zod.schmas";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { TPostCreate } from "@/app/utils/types/post";

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

  const post: TPostCreate = await request.json();

  let notification: ICreateNotification | null = {
    log: {
      date: new Date(),
      status: ErrorStatus.Low,
      title: "Coś poszło nie tak",
    },
    timer: 3000,
  };
  let newPost = null;

  const author = await prisma.user.findFirst();
  // TODO - change validation in all routes to zod
  //   const validProject = createProjectSchema.safeParse(project);
  // const result = validProject(project);
  // const findInValidResult = result.validResults.find(
  //   (result) => result.valid == false
  // );

  //   if (!validProject.success) {
  //     return NextResponse.json({
  //       carItem: newCarItem,
  //       notification: CreateNotification(
  //         ErrorStatus.Medium,
  //         validProject.error.message
  //       ),
  //     });
  //   }

  if (author?.id) {
    newPost = await createPost(post, author.id);

    if (newPost) {
      notification.log = {
        status: "Success",
        date: new Date(),
        title: "Post został dodany pomyślnie",
      };
    }
  }

  return NextResponse.json({ post: newPost, notification });
}

async function createPost(post: TPostCreate, authorId: string) {
  // const tagData: Prisma.TagUncheckedCreateWithoutProjectInput[] =
  //   tags?.map((tag) => ({
  //     name: tag.name,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     authorId: tag.authorId,
  //     projectId: tag.projectId || "",
  //     carItemId: tag.carItemId || "",
  //   })) || [];

  let newPost;
  try {
    newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.description,
        isProblem: false,
        published: true,
      },
    });
  } catch (error) {
    console.error("Error creating post", error);
    throw error;
  }

  return newPost;
}
