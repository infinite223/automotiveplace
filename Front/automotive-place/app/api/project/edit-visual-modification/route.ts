import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Status } from "@/app/utils/enums";

export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 401 },
    );
  }

  const data = await request.json();

  if (!data.id) {
    return NextResponse.json(
      { message: "Modification id not provided" },
      { status: 400 },
    );
  }

  try {
    const existing = await prisma.visualModification.findFirst({
      where: {
        id: data.id,
        authorId: user.user.$id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Modification not found or no permission" },
        { status: 404 },
      );
    }

    const updated = await prisma.visualModification.update({
      where: { id: data.id },
      data: {
        name: data.name,
        description: data.description,
        modificationType: data.modificationType,
        isVisible: data.isVisible,
      },
    });

    return NextResponse.json({
      modification: updated,
      notification: {
        log: {
          status: Status.Success,
          date: new Date(),
          title: "Modyfikacja została zaktualizowana",
        },
        timer: 3000,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message ?? "Unknown error" },
      { status: 400 },
    );
  }
}
