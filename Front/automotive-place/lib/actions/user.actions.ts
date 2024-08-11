"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";

export type SignUpParams = {
  email: string;
  password: string;
};

type SignInParams = SignUpParams;

export const signUp = async (userData: SignUpParams) => {
  try {
    console.log(userData);
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      userData.email,
      userData.password
    );
    const session = await account.createEmailPasswordSession(
      userData.email,
      userData.password
    );

    console.log(session);
    cookies().set("my-custom-session", session.secret, {
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

export const signIn = (userData: SignInParams) => {
  try {
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
