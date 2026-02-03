import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ICreateNotification } from "@/app/utils/types";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Status } from "@/app/utils/enums";
import { TPostCreate } from "@/app/utils/types/post";
import { createPostSchema } from "../../zod.schmas";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { checkText } from "../../moderation/textModeration";

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

  const post: TPostCreate = await request.json();
  const titleCheck = checkText(post.title);
  if (!titleCheck.ok) {
    return NextResponse.json({
      post,
      notification: CreateNotification(
        Status.Medium,
        `Tytuł zawiera niedozwolone słowo: "${titleCheck.word}"`,
      ),
    });
  }

  const descriptionCheck = checkText(post.content);
  if (!descriptionCheck.ok) {
    return NextResponse.json({
      post,
      notification: CreateNotification(
        Status.Medium,
        `Opis zawiera niedozwolone słowo: "${descriptionCheck.word}"`,
      ),
    });
  }

  let notification: ICreateNotification | null = {
    log: {
      date: new Date(),
      status: Status.Low,
      title: "Coś poszło nie tak",
    },
    timer: 3000,
  };
  let newPost = null;

  const author = await prisma.user.findUnique({ where: { id: user.user.$id } });
  const validProject = createPostSchema.safeParse(post);
  if (!validProject.success) {
    return NextResponse.json({
      post: post,
      notification: CreateNotification(
        Status.Medium,
        validProject.error.message,
      ),
    });
  }

  if (author?.id) {
    newPost = await createPost(post, author.id);

    if (newPost) {
      notification.log = {
        status: Status.Success,
        date: new Date(),
        title: "Post został dodany pomyślnie",
      };
    }
  }

  return NextResponse.json({ post: newPost, notification });
}

async function createPost(post: TPostCreate, authorId: string) {
  let newPost;
  try {
    newPost = await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        isProblem: false,
        published: true,
        authorId,
      },
    });

    const content = await prisma.content.create({
      data: {
        id: newPost.id,
        postId: newPost.id,
      },
    });

    await prisma.userContent.create({
      data: {
        userId: authorId,
        contentId: content.id,
        prio: 0,
      },
    });
  } catch (error) {
    console.error("Error creating post", error);
    throw error;
  }

  return newPost;
}
