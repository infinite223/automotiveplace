"use server";

import { NextRequest, NextResponse } from "next/server";
import { ErrorStatus, ICreateNotification } from "@/app/utils/types";

export async function GET(request: NextRequest) {
  const { searchParams }: any = new URL(request.url);
  const pin: string | undefined = searchParams.get("pin");

  let notification: ICreateNotification | null = {
    log: {
      date: new Date(),
      status: ErrorStatus.Low,
      title: "Podany pin jest błędny",
    },
    timer: 3000,
    showIcon: true,
  };

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
