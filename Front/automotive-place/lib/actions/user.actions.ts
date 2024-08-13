"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import prisma from "../prisma";

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
    //  TODO - maybe we need nick for user
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

    return JSON.parse(JSON.stringify(newUserAccount));
  } catch (error) {
    console.error(error);
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
    }
    // TODO - można jakiś provider do tego zrobić

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}
