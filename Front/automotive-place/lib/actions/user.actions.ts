"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import prisma from "../prisma";
import { AccountTypes, ErrorStatus } from "@/app/utils/enums";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";

export type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = SignInParams & {
  name: string;
};

export const getUserInfo = async (id: string) => {
  try {
    const findUser = await prisma.user.findUnique({ where: { id } });
    return JSON.parse(JSON.stringify(findUser));
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    const { account } = await createAdminClient();
    const newUserId = ID.unique();

    const newUserAccount = await account.create(
      newUserId,
      userData.email,
      userData.password,
      userData.name
    );

    await prisma.user.create({
      data: {
        name: userData.name,
        password: "",
        id: newUserId,
      },
    });

    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return {
      user: JSON.parse(JSON.stringify(newUserAccount)),
      notification: CreateNotification("Success", "Core.WelcomeBackToAmp"),
    };
  } catch (error) {
    return {
      user: null,
      notification: CreateNotification(
        ErrorStatus.Medium,
        error instanceof Error ? error.message : "Unknown error"
      ),
    };
  }
};

export const signIn = async (userData: SignInParams) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

    const user = await getUserInfo(session.userId);
    if (user) {
      cookies().set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: true,
      });

      return {
        user,
        notification: CreateNotification("Success", "Core.WelcomeBackToAmp"),
      };
    }

    return {
      user: null,
      notification: CreateNotification(
        ErrorStatus.Medium,
        "Błąd podczas logowania"
      ),
    };
  } catch (error) {
    return {
      user: null,
      notification: CreateNotification(
        ErrorStatus.Medium,
        error instanceof Error ? error.message : "Unknown error"
      ),
    };
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const user = await account.get();

    if (!user) return;

    const isAdmin = user?.labels.find((l) => l === AccountTypes.Admin);
    const isPremium = user?.labels.find((l) => l === AccountTypes.Premium);
    const isCompany = user?.labels.find((l) => l === AccountTypes.Company);

    return { user, isAdmin, isPremium, isCompany };
  } catch (error) {
    return null;
  }
}
