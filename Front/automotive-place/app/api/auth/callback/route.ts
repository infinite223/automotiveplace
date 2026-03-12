import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");

  if (!userId || !secret) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const { account } = await createAdminClient();

  const session = await account.createSession(userId, secret);

  (await cookies()).set("appwrite-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });

  return NextResponse.redirect(new URL("/app", request.url));
}
