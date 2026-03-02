import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Status } from "@/app/utils/enums";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getLoggedInUser();
  const { id } = await context.params;

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 401 },
    );
  }

  try {
    const existing = await prisma.visualModification.findFirst({
      where: {
        id: id,
        authorId: user.user.$id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "Modification not found or no permission" },
        { status: 404 },
      );
    }

    await prisma.visualModification.delete({
      where: { id: id },
    });

    return NextResponse.json({
      notification: {
        log: {
          status: Status.Success,
          date: new Date(),
          title: "Modyfikacja została usunięta",
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
