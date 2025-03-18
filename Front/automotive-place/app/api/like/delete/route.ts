import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { logger } from "@/app/api/logger.config";

export async function DELETE(request: NextRequest) {
  try {
    const userData = await getLoggedInUser();
    if (!userData) {
      return NextResponse.json(
        { message: "You must be logged in to use this functionality" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { likeableId } = body;

    if (!likeableId) {
      return NextResponse.json(
        { message: "Invalid request. Missing likeId" },
        { status: 400 }
      );
    }

    const deletedLike = await prisma.userActivity.deleteMany({
      where: {
        userId: userData.user.$id,
        entityId: likeableId,
      },
    });

    if (deletedLike.count === 0) {
      return NextResponse.json(
        {
          message: "Like not found or you do not have permission to delete it",
        },
        { status: 404 }
      );
    }

    logger.info(`User ${userData.user.$id} deleted likeableId ${likeableId}`);

    return NextResponse.json(
      { message: "Like deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);

      return NextResponse.json(
        { message: "An error occurred", error: error.message },
        { status: 500 }
      );
    }

    logger.error("Unknown critical error: " + error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
