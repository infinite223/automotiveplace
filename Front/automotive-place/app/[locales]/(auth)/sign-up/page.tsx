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
import { ZodIssue } from "zod";
import { userRegistrationSchema } from "@/app/api/zod.schmas";

export default function Page() {
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useDispatch();
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<null | ZodIssue[]>(null);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const userRegistration = { email, password, name };
    const validation = userRegistrationSchema.safeParse(userRegistration);

    if (!validation.success) {
      setErrors(validation.error.errors);

      return;
    }

    dispatch(setIsLoading(true));

    const result = await signUp(userRegistration);
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
            name="Email:"
            additionalTailwindCss="px-4"
            type="email"
            placeholder="Podaj email"
            setValue={(text) => setEmail(text.toString())}
            themeOption="white"
            error={errors?.find((e) => e.path.includes("email"))?.message}
          />
          <AMPInput
            placeholder="Podaj hasło"
            value={password}
            type="password"
            name="Hasło:"
            additionalTailwindCss="px-4"
            setValue={(text) => setPassword(text.toString())}
            themeOption="white"
            error={errors?.find((e) => e.path.includes("password"))?.message}
          />
          <AMPInput
            placeholder="Podaj nazwę konta"
            value={name}
            type="text"
            themeOption="white"
            additionalTailwindCss="px-4"
            name="Nazwa:"
            setValue={(text) => setName(text.toString())}
            error={errors?.find((e) => e.path.includes("name"))?.message}
          />
        </div>
        <AMPButton
          name={t("Core.SignUp")}
          additionalTailwindCss="bg-amp-500 text-white text-sm rounded-sm py-1.5 justify-center"
        />
      </form>

      <footer className="mt-3">
        <p className="text-xs">
          {t("Core.DoYouAlreadyHaveAnAccount")}
          <Link
            href={"./sign-in"}
            className="text-amp-700 dark:text-amp-300 font-semibold"
          >
            {" "}
            {t("Core.SignIn")}
          </Link>
        </p>
      </footer>
    </main>
  );
}
