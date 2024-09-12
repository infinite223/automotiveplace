import { NextRequest, NextResponse } from "next/server";
import { generateRandomContent } from "@/app/utils/data/contentData";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getTranslations } from "@/app/api/helpers";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const user = await getLoggedInUser();
  const locale = request.headers.get("accept-language")?.split(",")[0] || "en";
  console.log(locale, "locale");
  const t = getTranslations(locale);

  if (!user) {
    console.log("auth problem");
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
    where: { userId: user.$id },
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

  const authUser = false;

  // logic for getting content data...

  // Check if more data exists
  const hasMore = false;

  let responseResult: any;

  if (authUser) {
    // responseResult = result.map(({ id, ...rest }) => rest);
  }

  return NextResponse.json({
    data: generateRandomContent(30),
    hasMore,
  });
}
