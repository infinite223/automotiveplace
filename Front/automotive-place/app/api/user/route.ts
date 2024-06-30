import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = body;

    const existingUserByEmail = await prisma.user.findUnique({ where: email });
    if (existingUserByEmail) {
      return NextResponse.json({
        user: null,
        message: "User not exist with this email",
        status: 409,
      });
    }

    const existingUserByUserName = await prisma.user.findUnique({
      where: name,
    });
    if (existingUserByUserName) {
      return NextResponse.json({
        user: null,
        message: "User not exist with this name",
        status: 409,
      });
    }

    return NextResponse.json(body);
  } catch (error) {}
  return NextResponse.json({ success: true });
}
