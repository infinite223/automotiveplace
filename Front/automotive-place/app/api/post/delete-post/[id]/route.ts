import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Prisma } from "@prisma/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "You must be logged in to delete a post" },
      { status: 401 }
    );
  }

  const postId = params.id;
  console.log(postId, "postId");
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.authorId !== user.user.$id) {
      return NextResponse.json(
        { message: "You are not the owner of this post" },
        { status: 403 }
      );
    }

    await prisma.$transaction(async (tx) => {
      const contents = await tx.content.findMany({
        where: { postId },
        select: { id: true },
      });

      const contentIds = contents.map((c) => c.id);

      if (contentIds.length > 0) {
        await tx.userContent.deleteMany({
          where: { contentId: { in: contentIds } },
        });

        await tx.content.deleteMany({
          where: { id: { in: contentIds } },
        });
      }

      await tx.media.deleteMany({
        where: { postId },
      });

      await tx.tagAssignment.deleteMany({
        where: { postId },
      });

      await tx.userActivity.deleteMany({
        where: { postId },
      });

      await tx.post.delete({
        where: { id: postId },
      });
    });

    return NextResponse.json({
      message: "Post has been successfully deleted",
      deletedPostId: postId,
    });
  } catch (error) {
    console.error("Error deleting post:", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: `Database error: ${error.code}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Unknown error while deleting post" },
      { status: 500 }
    );
  }
}
