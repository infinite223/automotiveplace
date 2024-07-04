import { NextResponse } from "next/server";
import { ICreateNotification } from "@/app/utils/types";
import { log } from "console";
import { createNewUser, validUserIfExistInDatabse } from "./Validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, name, password } = body;

    const { valid, notification } = await validUserIfExistInDatabse({
      email,
      name,
    });

    if (valid) {
      const { notification, user } = await createNewUser(name, email, password);

      return NextResponse.json({ user, notification }, { status: 201 });
    }

    return NextResponse.json({ user: null, notification }, { status: 401 });
  } catch (error) {
    log(error);

    const notification: ICreateNotification = {
      log: {
        date: new Date(),
        status: "Information",
        title: "Nieoczekiwany błąd, spróbuj ponownie później",
      },
      timer: 2000,
    };
    return NextResponse.json({ user: null, notification }, { status: 400 });
  }
}
