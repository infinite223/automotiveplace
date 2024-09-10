import { NextRequest, NextResponse } from "next/server";
import { generateRandomContent } from "@/app/utils/data/contentData";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getTranslations } from "@/app/api/helpers";

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
  const limit = parseInt(searchParams.get("limit")) || 10;

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
