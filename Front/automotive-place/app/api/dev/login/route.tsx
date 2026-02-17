"use server";

import { NextRequest, NextResponse } from "next/server";
import { ICreateNotification } from "@/app/utils/types";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { Status } from "@/app/utils/enums";

export async function GET(request: NextRequest) {
  const { searchParams }: any = new URL(request.url);
  const pin: string | undefined = searchParams.get("pin");

  let notification: ICreateNotification | null = CreateNotification(
    Status.Low,
    "Podany pin jest błędny"
  );

  if (pin === process.env.DEV_PIN) {
    notification.log = {
      date: new Date(),
      status: Status.Success,
      title: "Udało się zalogować jako developer",
    };
  }

  return NextResponse.json({
    notification,
  });
}
