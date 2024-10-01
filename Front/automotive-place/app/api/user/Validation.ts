import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import {
  ErrorStatus,
  ICreateNotification,
  TValidResult,
} from "@/app/utils/types";
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
      notification: CreateNotification(
        "Information",
        "Ten email jest już używany w aplikacji"
      ),
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
      notification: CreateNotification(
        "Information",
        "Nazwa użytkownika jest już zajęta"
      ),
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

    return {
      user: newUser,
      notification: CreateNotification("Success", "Pomyślnie utworzono konto"),
    };
  } catch (error) {
    return {
      user: null,
      notification: CreateNotification(ErrorStatus.Low, "Coś poszło nie tak"),
    };
  }
};
