"use client";

import React from "react";
import { motion } from "framer-motion";
import { signOut } from "@/lib/actions/user.actions";
import { AMPButton } from "../shared/AMPButton";
import { useTranslations } from "next-intl";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { useRouter } from "next/navigation";
import { AMPSeparator } from "../shared/AMPSeparator";
import { IoPersonCircle, IoSettings, IoSettingsOutline } from "react-icons/io5";
import { iconSizes } from "@/app/utils/constants";
import { useDispatch } from "react-redux";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { clearContentData } from "@/lib/features/content/contentSlice";
import { BiMessageAdd, BiLogOut } from "react-icons/bi";

export default function UserSidebarContent({
  tailwindContainer,
}: {
  tailwindContainer: string;
}) {
  const t = useTranslations();
  const { user, loading, error } = useLoggedInUser();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnCLickSignOut = async () => {
    const result = await signOut();

    dispatch(clearContentData());
    dispatch(addNotification(JSON.stringify(result.notification)));

    if (result.notification.log.status !== "Success") {
      router.push("/");
    }
  };

  const handleOnCLick = () => {};

  if (error) {
    router.push("/");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      exit={{ opacity: 0, transition: { duration: 0 } }}
      key={1}
      className={tailwindContainer}
    >
      <div className="flex flex-col w-full gap-3">
        <nav className="flex w-full font-bold items-center gap-2">
          <span className="p-1 bg-amp-700 dark:bg-amp-200 rounded-full w-10 h-10 flex items-center justify-center">
            <IoPersonCircle size={iconSizes.large} />
          </span>
          {loading ? (
            <h1 className="animate-pulse">{t("Core.Loading")}...</h1>
          ) : (
            <h1>{user?.name}</h1>
          )}
        </nav>

        <AMPSeparator />

        <div className="flex gap-2 w-full flex-col items-start text-sm">
          <AMPButton
            icon={<IoSettingsOutline size={iconSizes.base} />}
            additionalTailwindCss="py-1 gap-2"
            name={t("Core.Settings")}
            onClick={handleOnCLick}
            type="none"
          />
          <AMPButton
            icon={<BiMessageAdd size={iconSizes.base} />}
            additionalTailwindCss="py-1 gap-2"
            name={t("Core.GiveFeedback")}
            onClick={handleOnCLick}
            type="none"
          />
          <AMPSeparator />
          <AMPButton
            icon={<BiLogOut size={iconSizes.base} />}
            additionalTailwindCss="py-1 gap-2"
            name={t("Core.LogOut")}
            onClick={handleOnCLickSignOut}
            type="none"
          />
        </div>
      </div>
    </motion.div>
  );
}
