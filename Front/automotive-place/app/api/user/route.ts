import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { ICreateNotification, TValidResult } from "@/app/utils/types";
import { log } from "console";

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

export const validUserIfExistInDatabse = async ({
  email,
  name,
}: {
  name: string;
  email: string;
}) => {
  // valid email
  const existingUserByEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUserByEmail) {
    return {
      valid: false,
      notification: {
        log: {
          date: new Date(),
          status: "Information",
          message: "Ten email jest już używany w aplikacji",
        },
        timer: 3000,
      },
    } as TValidResult;
  }

  // valid userName
  const existingUserByUserName = await prisma.user.findUnique({
    where: { name },
  });

  if (existingUserByUserName) {
    return {
      valid: false,
      notification: {
        log: {
          date: new Date(),
          status: "Information",
          message: "Nazwa użytkownika jest już zajęta",
        },
        timer: 3000,
      },
    } as TValidResult;
  }

  return {
    valid: true,
  } as TValidResult;
};

const createNewUser = async (name: string, email: string, password: string) => {
  try {
    const hashPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const notification: ICreateNotification = {
      log: {
        date: new Date(),
        status: "Success",
        title: "Pomyślnie utworzono konto",
      },
      timer: 3000,
    };

    return { user: newUser, notification };
  } catch (error) {
    log(error);
    const notification: ICreateNotification = {
      log: {
        date: new Date(),
        status: "Information",
        title: "Coś poszło nie tak",
      },
      timer: 3000,
    };

    return { user: null, notification };
  }
};
