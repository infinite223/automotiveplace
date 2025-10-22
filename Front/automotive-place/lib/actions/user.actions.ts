"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import prisma from "../prisma";
import { AccountTypes, ErrorStatus } from "@/app/utils/enums";
import { CreateNotification } from "@/app/components/logger/NotificationHelper";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { userLoginSchema, userRegistrationSchema } from "@/app/api/zod.schmas";
import { logger } from "@/app/api/logger.config";

export type SignInParams = {
  email: string;
  password: string;
};

type SignUpParams = SignInParams & {
  name: string;
};

export const getUserInfo = async (id: string) => {
  const user = getLoggedInUser();

  if (!user) {
    const locale = await getLocale();
    return redirect(`/${locale}/sign-in`);
  }

  try {
    const findUser = await prisma.user.findUnique({ where: { id } });
    console.log(findUser, "findUser");
    return JSON.parse(JSON.stringify(findUser));
  } catch (error) {
    console.error(error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    const validation = userRegistrationSchema.safeParse(userData);
    if (!validation.success) {
      throw new Error(validation.error.errors.map((e) => e.message).join(", "));
    }

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
    const validation = userLoginSchema.safeParse(userData);

    if (!validation.success) {
      throw new Error(validation.error.errors.map((e) => e.message).join(", "));
    }

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
        maxAge: 60 * 60 * 24 * 365,
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

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");

    cookies().set("appwrite-session", "", {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: -1,
    });

    return {
      notification: CreateNotification("Success", "Core.LoggedOutSuccessfully"),
    };
  } catch (error) {
    if (error instanceof Error) {
      logger.error(error.message);

      return {
        notification: CreateNotification(
          ErrorStatus.Medium,
          error instanceof Error ? error.message : "Unknown error"
        ),
      };
    }

    logger.error("Unknown critical error: " + error);

    return {
      notification: CreateNotification(ErrorStatus.Critical, "Unknown error"),
    };
  }
};
