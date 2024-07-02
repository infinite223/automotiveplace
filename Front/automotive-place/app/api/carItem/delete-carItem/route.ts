import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ErrorStatus, ICreateNotification } from "@/app/utils/types";

export async function DELETE(request: NextRequest) {
  const { searchParams }: any = new URL(request.url);
  const id = searchParams.get("id");
  const authUser = true;
  let result = {};
  let notification: ICreateNotification | null = {
    log: {
      date: new Date(),
      status: ErrorStatus.Low,
      title: "Coś poszło nie tak",
    },
    timer: 3000,
  };

  if (authUser) {
    result = await prisma.carItem.delete({
      where: { id },
    });

    if (result) {
      notification.log = {
        status: "Success",
        date: new Date(),
        title: "Pomyślnie usunięto element.",
      };
    }
  } else {
    notification.log.message = "Nie masz uprawnień do usuwania tego elementu.";
    NextResponse.json({ result: null, notification });
  }

  return NextResponse.json({ result: null, notification });
}
