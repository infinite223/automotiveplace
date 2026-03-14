import { createAdminClient } from "@/lib/server/appwrite";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Client, Account } from "node-appwrite";

async function getLocale(request: NextRequest) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("NEXT_LOCALE")?.value;

  if (cookieLocale) return cookieLocale;

  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const lang = acceptLanguage.split(",")[0].split("-")[0];
    if (["pl", "en"].includes(lang)) return lang;
  }

  return "pl";
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const locale = await getLocale(request);

  if (!userId || !secret) {
    return NextResponse.redirect(new URL(`/${locale}/sign-in`, request.url));
  }

  try {
    const { account: adminAccount } = await createAdminClient();
    const session = await adminAccount.createSession(userId, secret);

    const tempClient = new Client()
      .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
      .setSession(session.secret);

    const userAccount = await new Account(tempClient).get();

    await prisma.user.upsert({
      where: { id: userId },
      update: { name: userAccount.name },
      create: {
        id: userId,
        name: userAccount.name,
        password: "",
        email: userAccount.email,
        garage: {
          create: {
            name: `${userAccount.name} garage`,
            description: "Automated garage for Google user",
          },
        },
      },
    });

    (await cookies()).set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 365,
    });

    return NextResponse.redirect(new URL(`/${locale}/app`, request.url));
  } catch (error) {
    console.error("OAuth Callback Error:", error);
    return NextResponse.redirect(
      new URL(`/${locale}/sign-in?error=oauth_failed`, request.url),
    );
  }
}
