import { NextResponse } from "next/server";
import { log } from "console";
import { createNewUser, validUserIfExistInDatabse } from "./Validation";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { Status } from "@/app/utils/enums";

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
    return NextResponse.json(
      {
        user: null,
        notification: CreateNotification(
          Status.Information,
          "Nieoczekiwany błąd, spróbuj ponownie później"
        ),
      },
      { status: 400 }
    );
  }
}
