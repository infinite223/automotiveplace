import { NextRequest, NextResponse } from "next/server";
import { generateRandomContent } from "@/app/utils/data/contentData";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { logger } from "@/app/api/logger.config";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const { searchParams }: any = new URL(request.url);
  const limit = parseInt(searchParams.get("limit")) || 10;
  // TODO - dokończyć implementecje
  const userInterests = await prisma.userActivity.groupBy({
    by: ["entityType"],
    where: { userId: userData.user.$id },
    _count: {
      entityId: true,
    },
    orderBy: {
      _count: {
        entityId: "desc",
      },
    },
  });

  const personalizedPosts = await prisma.project.findMany({
    where: {
      tags: {
        some: {
          name: {
            in: userInterests.map((interest) => interest.entityType),
          },
        },
      },
    },
  });

  // logic for getting content data...

  // Check if more data exists
  const hasMore = false;

  let responseResult: any;

  logger.info("Content was generated successfully ");

  return NextResponse.json({
    data: generateRandomContent(10),
    hasMore,
  });
}
