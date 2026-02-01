import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Status } from "@/app/utils/enums";
import { THistoryCreate } from "@/app/utils/types/history";
import { mapSingleHistoryToPrisma } from "../../mappers/history";

export async function POST(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      { status: 404 },
    );
  }

  const history: THistoryCreate = await request.json();

  const author = await prisma.user.findUnique({
    where: { id: user.user.$id },
    include: { garage: { select: { id: true } } },
  });

  if (!author?.id) {
    return NextResponse.json({ message: "Author not found" }, { status: 404 });
  }

  if (!author.garage?.id) {
    return NextResponse.json({ message: "Garage not found" }, { status: 404 });
  }

  if (!history) {
    return NextResponse.json({ message: "History not found" }, { status: 404 });
  }

  if (!history.projectId) {
    return NextResponse.json(
      { message: "History projectId not found" },
      { status: 404 },
    );
  }

  try {
    const data = await prisma.projectHistory.create({
      data: {
        ...mapSingleHistoryToPrisma(history, author.id),
        projectId: history.projectId,
      },
    });

    return NextResponse.json({
      history: data,
      notification: {
        log: {
          status: Status.Success,
          date: new Date(),
          title: "Wpis został dodany pomyślnie",
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
