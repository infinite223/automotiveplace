"use client";

import { useTranslations } from "next-intl";
import { AMPButton } from "./AMPButton";
import { IoSettingsOutline } from "react-icons/io5";
import { iconSizes } from "@/app/utils/constants";
import { AMPSeparator } from "./AMPSeparator";
import { clearContentData } from "@/lib/features/content/contentSlice";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { signOut } from "@/lib/actions/user.actions";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useLoggedInUser } from "@/app/hooks/useLoggedInUser";
import { BiLogOut, BiMessageAdd } from "react-icons/bi";

export const MobileMenuContent = ({ onClose }: { onClose: () => void }) => {
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

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-lg">Menu</span>
        <button onClick={onClose}>✕</button>
      </div>

      {/* <OptionItem
        icon={<MdGroups size={20} />}
        name={t("Core.Groups")}
        route={`/${locale}/groups`}
      /> */}

      {/* <Link href={`/${locale}/settings`} className="flex gap-4 items-center">
        <FiSettings size={20} />
        {t("Core.Settings")}
      </Link> */}

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
  );
};
