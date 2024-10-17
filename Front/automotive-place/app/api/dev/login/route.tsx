"use server";

import { NextRequest, NextResponse } from "next/server";
import { ErrorStatus, ICreateNotification } from "@/app/utils/types";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";

export async function GET(request: NextRequest) {
  const { searchParams }: any = new URL(request.url);
  const pin: string | undefined = searchParams.get("pin");

  let notification: ICreateNotification | null = CreateNotification(
    ErrorStatus.Low,
    "Podany pin jest błędny"
  );
  console.log(process.env.DEV_PIN, "pin");
  if (pin === process.env.DEV_PIN) {
    notification.log = {
      date: new Date(),
      status: "Success",
      title: "Udało się zalogować jako developer",
    };
  }

  return NextResponse.json({
    notification,
  });
}
