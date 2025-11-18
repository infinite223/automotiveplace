import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ICreateNotification } from "@/app/utils/types";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { Status } from "@/app/utils/enums";

export async function DELETE(request: NextRequest) {
  const user = await getLoggedInUser();

  if (!user) {
    return NextResponse.json(
      { message: "YouMustBeLoggedInToUseThisFunctionality" },
      {
        status: 404,
        statusText: "Unauthorized",
      }
    );
  }

  const { searchParams }: any = new URL(request.url);
  const id = searchParams.get("id");
  const authUser = true;
  let result = {};
  let notification: ICreateNotification | null = CreateNotification(
    Status.Low,
    "Coś poszło nie tak"
  );

  if (authUser) {
    result = await prisma.carItem.delete({
      where: { id },
    });

    if (result) {
      notification.log = {
        status: Status.Success,
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
