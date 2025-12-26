import { NextRequest, NextResponse } from "next/server";
// import redis from "@/lib/redis";
// import { getLoggedInUser } from "@/lib/actions/user.actions";

export async function POST(req: NextRequest) {
  // try {
  //   const userData = await getLoggedInUser();
  //   if (!userData) {
  //     return NextResponse.json(
  //       { message: "Core.YouMustBeLoggedInToUseThisFunctionality" },
  //       { status: 401 }
  //     );
  //   }
  //   const body = await req.json();
  //   const { userId, contentIds } = body;
  //   if (!userId || !Array.isArray(contentIds)) {
  //     return NextResponse.json(
  //       { message: "UserId and contentIds are required and should be valid" },
  //       { status: 400 }
  //     );
  //   }
  //   const redisKey = `user:seenContent:${userId}`;
  //   const existingContentIds = await redis.sMembers(redisKey);
  //   const newContentIds = contentIds.filter(
  //     (id) => !existingContentIds.includes(id)
  //   );
  //   if (newContentIds.length > 0) {
  //     await redis.sAdd(redisKey, newContentIds);
  //     await redis.expire(redisKey, 86400);
  //   }
  //   return NextResponse.json({
  //     message: "Seen content updated successfully",
  //     added: newContentIds,
  //   });
  // } catch (error) {
  //   console.error("Error updating seen content:", error);
  //   return NextResponse.json(
  //     { message: "Error updating seen content" },
  //     { status: 500 }
  //   );
  // }
}
