import { NextRequest, NextResponse } from "next/server";
import { generateRandomContent } from "@/app/utils/data/contentData";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getTranslations } from "@/app/api/helpers";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const userData = await getLoggedInUser();
  const locale = request.headers.get("accept-language")?.split(",")[0] || "en";

  const t = getTranslations(locale);

  if (!userData) {
    return NextResponse.json(
      { message: t["Core"]["YouMustBeLoggedInToUseThisFunctionality"] },
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

  return NextResponse.json({
    data: generateRandomContent(10),
    hasMore,
  });
}
