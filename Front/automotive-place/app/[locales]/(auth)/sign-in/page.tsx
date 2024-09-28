"use client";

import { useEffect, useState } from "react";
import { AMPInput } from "../../../components/shared/AMPInput";
import { AMPButton } from "@/app/components/shared/AMPButton";
import Link from "next/link";
import { getLoggedInUser, signIn } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Page() {
  const router = useRouter();
  const t = useTranslations();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const chekUserLoggedIn = async () => {
      const user = await getLoggedInUser();
      if (user) router.push(`./app`);
    };

    chekUserLoggedIn();
  }, [router]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const userData = await signIn({ email, password });
    if (userData) router.push("./app");
  };

  return (
    <main className="w-full items-center flex flex-col justify-center">
      <form
        onSubmit={onSubmit}
        className="w-[300px] gap-2 bottom-1 flex flex-col"
      >
        <div className="flex flex-col mb-10">
          <p className="text-xs font-thin">Witaj ponownie!</p>
          <h1 className="text-2xl font-bold">{t("Core.SignIn")}</h1>
        </div>
        <div className="flex flex-col bordre-2">
          <AMPInput
            value={email}
            name="Email"
            type="email"
            themeOption="white"
            placeholder="Podaj email"
            setValue={(text) => setEmail(text.toString())}
          />
          <AMPInput
            placeholder="Podaj hasło"
            value={password}
            type="password"
            name="Hasło"
            themeOption="white"
            setValue={(text) => setPassword(text.toString())}
          />
        </div>
        <AMPButton
          name={t("Core.SignIn")}
          additionalTailwindCss="bg-redColor text-white text-sm rounded-sm py-1.5"
        />
      </form>

      <footer className="mt-3">
        <p className="text-xs">
          {t("Core.DontHaveAnAccountYet")}
          <Link href={"./sign-up"} className="text-baseColor font-semibold">
            {" "}
            {t("Core.SignUp")}
          </Link>
        </p>
      </footer>
    </main>
  );
}
