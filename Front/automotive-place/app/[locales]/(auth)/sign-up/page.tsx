"use client";

import { useEffect, useState } from "react";
import { AMPInput } from "../../../components/shared/AMPInput";
import { AMPButton } from "@/app/components/shared/AMPButton";
import Link from "next/link";
import { getLoggedInUser, signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setIsLoading } from "@/lib/features/loading/globalLoadingSlice";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { ZodIssue } from "zod";
import { userRegistrationSchema } from "@/app/api/zod.schmas";
import { Status } from "@/app/utils/enums";

export default function Page() {
  const router = useRouter();
  const t = useTranslations();
  const dispatch = useDispatch();
  const locale = useLocale();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<null | ZodIssue[]>(null);

  useEffect(() => {
    const chekUserLoggedIn = async () => {
      dispatch(setIsLoading(true));

      const user = await getLoggedInUser();
      dispatch(setIsLoading(false));

      if (user) router.push(`./app`);
    };

    chekUserLoggedIn();
  }, [router, locale]);

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
    if (result.notification.log.status === Status.Success) router.push(`./app`);
  };

  return (
    <main className="w-full items-center flex flex-col justify-center">
      <form
        onSubmit={onSubmit}
        className="w-[300px] gap-2 bottom-1 flex flex-col"
      >
        <div className="flex flex-col mb-10">
          <p className="text-xs font-thin">{t("Core.Welcome")}</p>
          <h1 className="text-2xl font-bold">{t("Core.CreateAccount")}</h1>
        </div>
        <div className="flex flex-col bordre-2">
          <AMPInput
            value={email}
            name={t("Core.EmailAddress") + ":"}
            type="email"
            placeholder={t("Core.Placeholders.EnterEmail")}
            setValue={(text) => setEmail(text.toString())}
            error={errors?.find((e) => e.path.includes("email"))?.message}
          />
          <AMPInput
            placeholder={t("Core.Placeholders.EnterPassword")}
            value={password}
            type="password"
            name={t("Core.Password") + ":"}
            setValue={(text) => setPassword(text.toString())}
            error={errors?.find((e) => e.path.includes("password"))?.message}
          />
          <AMPInput
            placeholder={t("Core.Placeholders.EnterAccountName")}
            value={name}
            type="text"
            name={t("Core.AccountName") + ":"}
            setValue={(text) => setName(text.toString())}
            error={errors?.find((e) => e.path.includes("name"))?.message}
          />
        </div>
        <AMPButton
          name={t("Core.SignUp")}
          additionalTailwindCss="bg-amp-500 text-white text-sm rounded-sm py-1.5 justify-center"
          isSubmit
        />
      </form>

      <footer className="mt-3">
        <p className="text-xs">
          {t("Core.DoYouAlreadyHaveAnAccount")}
          <Link
            href={"./sign-in"}
            className="text-amp-300 dark:text-amp-700/70 ml-2 font-semibold"
          >
            {" "}
            {t("Core.SignIn")}
          </Link>
        </p>
      </footer>
    </main>
  );
}
