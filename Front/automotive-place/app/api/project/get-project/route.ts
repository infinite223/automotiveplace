import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { generateRandomProjects } from "@/app/utils/data/project";

export async function GET(request: NextRequest) {
  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "Core.YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const { searchParams }: any = new URL(request.url);
  const projectId = parseInt(searchParams.get("id"));
  console.log("get: ", projectId);
  // TODO - add log for user actions db -> userActivity

  return NextResponse.json(generateRandomProjects(1)[0]);
}
