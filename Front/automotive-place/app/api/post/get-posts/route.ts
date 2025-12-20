import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";

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

  const posts = await prisma.post.findMany({
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
  if (posts.length > limit) {
    hasMore = true;
    posts.pop();
  }

  const data = posts.map((post) => ({
    id: post.id,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,

    title: post.title,
    content: post.content ?? "",

    images: post.media.map((m) => m.fileLocation),

    tags: post.tagAssignments.map((ta) => ({
      id: ta.tag.id,
      name: ta.tag.name,
    })),

    likesCount: post.userActivity.length,

    isLikedByAuthUser: !!post.userActivity.find(
      (ua) => ua.userId === userData.user.$id && ua.activityType === "LIKE"
    ),

    author: {
      id: post.author!.id,
      name: post.author!.name,
      email: post.author!.email,
    },
  }));

  return NextResponse.json({
    data,
    hasMore,
    page,
  });
}
