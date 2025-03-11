import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { logger } from "@/app/api/logger.config";
import { ActivityType, EntityType, LikeableType } from "@prisma/client";

export async function POST(request: NextRequest) {
  try {
    const userData = await getLoggedInUser();

    if (!userData) {
      return NextResponse.json(
        { message: "You must be logged in to use this functionality" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { likeableId, likeableType } = body;
    const tags = body.tags || [];

    if (!likeableId || !likeableType) {
      return NextResponse.json(
        { message: "Invalid request. Missing likeableId or likeableType" },
        { status: 400 }
      );
    }

    const validLikeableTypes = [
      "POST",
      "PROJECT",
      "CARITEM",
      "SPOT",
      "COMPANY",
    ];

    if (!validLikeableTypes.includes(likeableType as LikeableType)) {
      return NextResponse.json(
        { message: "Invalid likeableType" },
        { status: 400 }
      );
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        userId: userData.user.$id,
        likeableId,
        likeableType: likeableType as LikeableType,
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: "You have already liked this item" },
        { status: 400 }
      );
    }

    const data: any = {
      userId: userData.user.$id,
      likeableId,
      likeableType,
    };

    switch (likeableType) {
      case "POST":
        data.postId = likeableId;
        break;
      case "PROJECT":
        data.projectId = likeableId;
        break;
      case "CARITEM":
        data.carItemId = likeableId;
        break;
      case "SPOT":
        data.spotId = likeableId;
        break;
      case "COMPANY":
        data.companyId = likeableId;
        break;
      default:
        return NextResponse.json(
          { message: "Invalid likeableType" },
          { status: 400 }
        );
    }

    await prisma.like.create({
      data,
    });

    await prisma.userActivity.create({
      data: {
        userId: userData.user.$id,
        activityType: ActivityType.LIKE,
        entityId: likeableId,
        entityType: likeableType as EntityType,
        tags: { connect: tags.map((tag: { id: string }) => ({ id: tag })) },
      },
    });

    // run job to create new content
    logger.info(
      `User ${userData.user.$id} liked ${likeableType} with ID ${likeableId}`
    );

    return NextResponse.json(
      { message: "Like added successfully" },
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
