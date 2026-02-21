import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { TBasicPost } from "@/app/utils/types/post";

export async function GET(request: NextRequest) {
  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 0;

  const postsFromDb = await prisma.post.findMany({
    take: limit + 1,
    skip: page * limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      tagAssignments: {
        include: {
          tag: true,
        },
      },
      userActivity: true,
      media: true,
    },
  });

  let hasMore = false;
  if (postsFromDb.length > limit) {
    hasMore = true;
    postsFromDb.pop();
  }

  const data: TBasicPost[] = postsFromDb.map((post) => ({
    id: post.id,
    title: post.title,
    content: post.content ?? "",
    imagesUrl: post.media.length > 0 ? post.media[0].fileLocation : null,
    likesCount: post.userActivity.length,
    isLikedByAuthUser: !!post.userActivity.find(
      (ua) => ua.userId === userData.user.$id && ua.activityType === "LIKE"
    ),
    lastUpdateAt: post.updatedAt,
    author: {
      id: post.author!.id,
      name: post.author!.name,
      email: post.author!.email,
    },
    tags: post.tagAssignments.map((ta) => ({
      id: ta.tag.id,
      name: ta.tag.name,
    })),
  }));

  return NextResponse.json({
    data,
    hasMore,
    page,
  });
}
