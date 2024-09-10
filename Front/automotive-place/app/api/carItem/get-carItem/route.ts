import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getTranslations } from "../../helpers";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export async function GET(request: NextRequest) {
  const user = await getLoggedInUser();
  const locale = request.headers.get("accept-language")?.split(",")[0] || "en";
  const t = getTranslations(locale);

  if (!user) {
    return NextResponse.json(
      { message: t["Core"]["YouMustBeLoggedInToUseThisFunctionality"] },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const { searchParams }: any = new URL(request.url);
  const limit = parseInt(searchParams.get("limit")) || 10; // Default limit if not specified

  const authUser = false; // Change this to your actual authentication logic

  const result = await prisma.carItem.findMany({
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  // Check if more data exists
  const totalItems = await prisma.carItem.count();
  const hasMore = totalItems > limit;

  let responseResult: any = result;

  if (authUser) {
    responseResult = result.map(({ id, ...rest }) => rest);
  }

  return NextResponse.json({
    data: responseResult,
    hasMore,
  });
}
