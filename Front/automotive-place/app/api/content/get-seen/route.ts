import { NextApiRequest, NextApiResponse } from "next";
import redis from "@/lib/redis";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { NextResponse } from "next/server";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const userData = await getLoggedInUser();

  if (!userData) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 404, statusText: "Unauthorized" }
    );
  }

  const { userId, seenPostIds } = req.body;

  if (!userId || !Array.isArray(seenPostIds)) {
    return res.status(400).json({
      message: "UserId and seenPostIds are required and should be valid",
    });
  }

  try {
    const redisKey = `user:seenContent:${userId}`;

    await redis.sAdd(redisKey, seenPostIds);

    await redis.expire(redisKey, 86400); // TTL 24 godziny

    res.status(200).json({ message: "Seen content updated successfully" });
  } catch (error) {
    console.error("Error updating seen content:", error);
    res.status(500).json({ message: "Error updating seen content" });
  }
}
