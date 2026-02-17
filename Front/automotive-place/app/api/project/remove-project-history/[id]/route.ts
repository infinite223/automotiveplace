import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Status } from "@/app/utils/enums";

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 401 },
    );
  }

  const { id: historyId } = await context.params;

  if (!historyId) {
    return NextResponse.json(
      { message: "History id not provided" },
      { status: 400 },
    );
  }

  try {
    const existing = await prisma.projectHistory.findFirst({
      where: {
        id: historyId,
        authorId: user.user.$id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "History not found or no permission" },
        { status: 404 },
      );
    }

    await prisma.projectHistory.delete({
      where: { id: historyId },
    });

    return NextResponse.json({
      notification: {
        log: {
          status: Status.Success,
          date: new Date(),
          title: "Wpis został usunięty",
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
