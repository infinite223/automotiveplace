import { ICreateNotification, TValidResult } from "@/app/utils/types";
import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

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
      error: "Ten email jest już używany w aplikacji",
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
      error: "Nazwa użytkownika jest już zajęta",
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
    error: "",
  } as TValidResult;
};

export const createNewUser = async (
  name: string,
  email: string,
  password: string
) => {
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
