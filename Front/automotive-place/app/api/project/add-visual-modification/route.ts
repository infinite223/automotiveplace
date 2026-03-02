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

  try {
    const newMod = await prisma.visualModification.create({
      data: {
        name: data.name,
        description: data.description,
        modificationType: data.modificationType,
        isVisible: data.isVisible ?? true,
        projectId: data.projectId,
        authorId: user.user.$id,
        isBlockedByAdmin: false,
      },
    });

    return NextResponse.json({
      modification: newMod,
      notification: {
        log: {
          status: Status.Success,
          date: new Date(),
          title: "Modyfikacja została dodana",
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
