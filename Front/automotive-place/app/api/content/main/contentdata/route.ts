import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  contentData,
  generateRandomContent,
} from "@/app/utils/data/contentData";

export async function GET(request: NextRequest) {
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
