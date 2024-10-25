"use client";

import { useState } from "react";
import { AMPInput } from "../../../components/shared/AMPInput";
import { AMPButton } from "@/app/components/shared/AMPButton";
import Link from "next/link";
import { signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/lib/features/loading/globalLoadingSlice";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";

export default function Page() {
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useDispatch();
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setIsLoading(true));

    const result = await signUp({ email, password, name });
    dispatch(setIsLoading(false));
    dispatch(addNotification(JSON.stringify(result.notification)));
    if (result.notification.log.status === "Success")
      router.push(`${locale}/app`);
  };

  return (
    <main className="w-full items-center flex flex-col justify-center">
      <form
        onSubmit={onSubmit}
        className="w-[300px] gap-2 bottom-1 flex flex-col"
      >
        <div className="flex flex-col mb-10">
          <p className="text-xs font-thin">Witaj!</p>
          <h1 className="text-2xl font-bold">Utwórz konto</h1>
        </div>
        <div className="flex flex-col bordre-2">
          <AMPInput
            value={email}
            name="Email"
            type="email"
            placeholder="Podaj email"
            setValue={(text) => setEmail(text.toString())}
            themeOption="white"
          />
          <AMPInput
            placeholder="Podaj hasło"
            value={password}
            type="password"
            name="Hasło"
            setValue={(text) => setPassword(text.toString())}
            themeOption="white"
          />
          <AMPInput
            placeholder="Podaj nazwę konta"
            value={name}
            type="text"
            themeOption="white"
            name="Nazwa"
            setValue={(text) => setName(text.toString())}
          />
        </div>
        <AMPButton
          name={t("Core.SignUp")}
          additionalTailwindCss="bg-redColor text-white text-sm rounded-sm py-1.5"
        />
      </form>

      <footer className="mt-3">
        <p className="text-xs">
          {t("Core.DoYouAlreadyHaveAnAccount")}
          <Link href={"./sign-in"} className="text-baseColor font-semibold">
            {" "}
            {t("Core.SignIn")}
          </Link>
        </p>
      </footer>
    </main>
  );
}
