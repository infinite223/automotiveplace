import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import prisma from "@/lib/prisma";
import { logger } from "@/app/api/logger.config";
import { ActivityType, EntityType } from "@prisma/client";
import { generateContentForUser } from "../../contentGeneration";

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
    const { likeableId, entityType } = body;
    const tags = body.tags || [];

    if (!likeableId || !entityType) {
      return NextResponse.json(
        { message: "Invalid request. Missing likeableId or entityType" },
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

    if (!validLikeableTypes.includes(entityType as EntityType)) {
      return NextResponse.json(
        { message: "Invalid likeableType" },
        { status: 400 }
      );
    }

    const existingLike = await prisma.userActivity.findFirst({
      where: {
        userId: userData.user.$id,
        entityId: likeableId,
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
      activityType: ActivityType.LIKE,
      entityId: likeableId,
      entityType: entityType as EntityType,

      tags: { connect: tags.map((tag: { id: string }) => ({ id: tag })) },
    };

    switch (entityType) {
      case EntityType.POST:
        data.postId = likeableId;
        break;
      case EntityType.PROJECT:
        data.projectId = likeableId;
        break;
      case EntityType.CARITEM:
        data.carItemId = likeableId;
        break;
      case EntityType.SPOT:
        data.spotId = likeableId;
        break;
      // TODO: maybe we need company like
      default:
        return NextResponse.json(
          { message: "Invalid likeableType" },
          { status: 400 }
        );
    }

    await prisma.userActivity.create({
      data,
    });

    await generateContentForUser(userData.user.$id);

    // run job to create new content
    logger.info(
      `User ${userData.user.$id} liked ${entityType} with ID ${likeableId}`
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
