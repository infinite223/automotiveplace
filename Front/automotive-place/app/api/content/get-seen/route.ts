import { NextRequest, NextResponse } from "next/server";
import redis from "@/lib/redis";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export async function POST(req: NextRequest) {
  try {
    const userData = await getLoggedInUser();
    if (!userData) {
      return NextResponse.json(
        { message: "You must be logged in to use this functionality" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { userId, seenPostIds } = body;

    if (!userId || !Array.isArray(seenPostIds)) {
      return NextResponse.json(
        { message: "UserId and seenPostIds are required and should be valid" },
        { status: 400 }
      );
    }

    const redisKey = `user:seenContent:${userId}`;

    await redis.sAdd(redisKey, seenPostIds);
    await redis.expire(redisKey, 86400);

    return NextResponse.json({ message: "Seen content updated successfully" });
  } catch (error) {
    console.error("Error updating seen content:", error);
    return NextResponse.json(
      { message: "Error updating seen content" },
      { status: 500 }
    );
  }
}
