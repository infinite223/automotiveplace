"use client";

import { useEffect, useState } from "react";
import { AMPInput } from "../../../components/shared/AMPInput";
import { AMPButton } from "@/app/components/shared/AMPButton";
import Link from "next/link";
import { getLoggedInUser, signIn } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { setIsLoading } from "@/lib/features/loading/globalLoadingSlice";
import { userLoginSchema } from "@/app/api/zod.schmas";
import { ZodIssue } from "zod";
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

    const userLoginData = { email, password };
    const validation = userLoginSchema.safeParse(userLoginData);

    if (!validation.success) {
      setErrors(validation.error.errors);

      return;
    }

    dispatch(setIsLoading(true));

    const result = await signIn(userLoginData);
    setErrors(null);
    dispatch(addNotification(JSON.stringify(result.notification)));
    dispatch(setIsLoading(false));
    if (result.notification.log.status === "Success") router.push("./app");
  };

  const validateField = (field: "email" | "password", value: string) => {
    const schema = userLoginSchema.pick({ [field]: true } as any);

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
    <main className="w-full items-center flex py-2 flex-col justify-evenly h-full">
      <div className="h-full flex justify-center items-center">
        <Image src={Logo} alt="logo" width={60} height={60} className="h-fit" />
      </div>
      <form
        onSubmit={onSubmit}
        className="md:w-[300px] w-full h-full max-w-[85vw] gap-2 bottom-1 flex flex-col"
      >
        <div className="flex flex-col items-center mb-5 gap-2 opacity-80">
          <p className="text-xs font-thin">{t("Core.HelloAgain")}</p>
          <h1 className="text-2xl font-bold">{t("Core.SignIn")}</h1>
        </div>
        <div className="flex flex-col bordre-2">
          <AMPInput
            value={email}
            name={t("Core.EmailAddress") + ":"}
            type="email"
            placeholder={t("Core.Placeholders.EnterEmail")}
            error={errors?.find((e) => e.path.includes("email"))?.message}
            setValue={(text) => {
              const value = text.toString();
              setEmail(value);
              validateField("email", value);
            }}
          />
          <AMPInput
            placeholder={t("Core.Placeholders.EnterPassword")}
            value={password}
            type="password"
            name={t("Core.Password") + ":"}
            error={errors?.find((e) => e.path.includes("password"))?.message}
            setValue={(text) => {
              const value = text.toString();
              setPassword(value);
              validateField("password", value);
            }}
          />
        </div>

        <AMPButton
          name={t("Core.SignIn")}
          additionalTailwindCss="mt-4 bg-amp-500 text-white text-sm justify-center"
          isSubmit
        />
      </form>

      <footer className="text-center flex flex-col justify-center h-full gap-5 mt-2">
        <p className="text-sm opacity-90">
          {t("Core.DontHaveAnAccountYet")}
          <Link href={"./sign-up"} className="text-amp-500 ml-2 font-semibold">
            {t("Core.SignUp")}
          </Link>
        </p>

        <div className="flex flex-col gap-5">
          <p className="uppercase opacity-40 text-[10px] font-light">
            Lub kontynuuj przez
          </p>

          <div className="flex gap-4 justify-center">
            <button
              type="button"
              className="flex items-center gap-2 h-12 w-12 justify-center border border-gray-300/50 rounded-full
                   hover:text-amp-500 transition text-sm font-medium"
              onClick={() => {
                console.log("Google login");
              }}
            >
              <FaGoogle size={iconSizes.small} />
            </button>

            <button
              type="button"
              className="flex items-center gap-2 h-12 w-12 justify-center border border-gray-300/50 rounded-full
                   hover:text-amp-500 transition text-sm font-medium"
              onClick={() => {
                console.log("Facebook login");
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
