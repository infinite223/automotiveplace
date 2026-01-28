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
import Logo from "../../../../asets/logo_3.png";
import Image from "next/image";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { iconSizes } from "@/app/utils/constants";

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
  type RegistrationField = "email" | "password" | "name";

  const validateField = (field: RegistrationField, value: string) => {
    if (value.length === 0) {
      setErrors((prev) => {
        if (!prev) return null;
        const filtered = prev.filter((e) => !e.path.includes(field));
        return filtered.length ? filtered : null;
      });
      return;
    }

    const schema = userRegistrationSchema.pick({ [field]: true } as any);
    const result = schema.safeParse({ [field]: value });

    setErrors((prev) => {
      if (result.success) {
        if (!prev) return null;
        const filtered = prev.filter((e) => !e.path.includes(field));
        return filtered.length ? filtered : null;
      }

      const otherErrors = prev?.filter((e) => !e.path.includes(field)) ?? [];
      return [...otherErrors, ...result.error.errors];
    });
  };

  return (
    <main className="w-full items-center py-2 flex flex-col justify-between h-full">
      <div className="h-full flex justify-center items-center">
        <Image src={Logo} alt="logo" width={60} height={60} className="h-fit" />
      </div>
      <form
        onSubmit={onSubmit}
        className="md:w-[300px] w-full h-full max-w-[85vw] gap-2 bottom-1 flex flex-col"
      >
        <div className="flex flex-col mb-5 gap-2 items-center">
          <p className="text-xs font-thin opacity-80">{t("Core.Welcome")}</p>
          <h1 className="text-2xl font-bold">{t("Core.CreateAccount")}</h1>
        </div>
        <div className="flex flex-col bordre-2">
          <AMPInput
            value={email}
            name={t("Core.EmailAddress") + ":"}
            type="email"
            placeholder={t("Core.Placeholders.EnterEmail")}
            setValue={(text) => {
              const value = text.toString();
              setEmail(value);
              validateField("email", value);
            }}
            error={errors?.find((e) => e.path.includes("email"))?.message}
          />
          <AMPInput
            placeholder={t("Core.Placeholders.EnterPassword")}
            value={password}
            type="password"
            name={t("Core.Password") + ":"}
            setValue={(text) => {
              const value = text.toString();
              setPassword(value);
              validateField("password", value);
            }}
            error={errors?.find((e) => e.path.includes("password"))?.message}
          />
          <AMPInput
            placeholder={t("Core.Placeholders.EnterAccountName")}
            value={name}
            type="text"
            name={t("Core.AccountName") + ":"}
            setValue={(text) => {
              const value = text.toString();
              setName(value);
              validateField("name", value);
            }}
            error={errors?.find((e) => e.path.includes("name"))?.message}
          />
        </div>
        <AMPButton
          name={t("Core.SignUp")}
          additionalTailwindCss="bg-amp-500 text-white text-sm rounded-sm py-1.5 justify-center"
          isSubmit
        />
      </form>

      <footer className="text-center flex flex-col justify-center h-full gap-5 mt-2">
        <p className="text-sm opacity-90">
          {t("Core.DoYouAlreadyHaveAnAccount")}
          <Link href={"./sign-in"} className="text-amp-500 ml-2 font-semibold">
            {t("Core.SignIn")}
          </Link>
        </p>

        <div className="flex flex-col gap-5 pb-5">
          <p className="uppercase opacity-40 text-[10px] font-light">
            Lub kontynuuj przez
          </p>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="flex items-center justify-center h-12 w-12
                   border border-gray-300/50 rounded-full
                   hover:text-amp-500 transition"
              onClick={() => {
                console.log("Google register");
              }}
            >
              <FaGoogle size={iconSizes.small} />
            </button>

            <button
              type="button"
              className="flex items-center justify-center h-12 w-12
                   border border-gray-300/50 rounded-full
                   hover:text-amp-500 transition"
              onClick={() => {
                console.log("Facebook register");
              }}
            >
              <FaFacebookF size={iconSizes.small} />
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}
