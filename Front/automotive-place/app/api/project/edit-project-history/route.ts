import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Status } from "@/app/utils/enums";
import { THistoryEdit } from "@/app/utils/types/history";
import { mapSingleHistoryToPrisma } from "../../mappers/history";

export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 401 },
    );
  }

  const history: THistoryEdit = await request.json();

  if (!history.id) {
    return NextResponse.json(
      { message: "History id not provided" },
      { status: 400 },
    );
  }

  try {
    const existing = await prisma.projectHistory.findFirst({
      where: {
        id: history.id,
        authorId: user.user.$id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        { message: "History not found or no permission" },
        { status: 404 },
      );
    }

    const updated = await prisma.projectHistory.update({
      where: { id: history.id },
      data: mapSingleHistoryToPrisma(history, user.user.$id),
    });

    return NextResponse.json({
      history: updated,
      notification: {
        log: {
          status: Status.Success,
          date: new Date(),
          title: "Wpis został zaktualizowany",
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
