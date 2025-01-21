import type { Metadata } from "next";
import { HomeHeader } from "./HomeHeader";
import { SideBar } from "../../components/shared/Sidebar";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getLocale } from "next-intl/server";
import { TbMessage2Up } from "react-icons/tb";
import { IoNotifications, IoPersonCircle } from "react-icons/io5";

export const metadata: Metadata = {
  title: "Home",
  description: "Główna strona automotiveplace",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  const locale = await getLocale();

  if (!user) return redirect(`/${locale}/sign-in`);

  return (
    <div className="flex h-screen flex-col bg-amp-900 dark:bg-amp-0 text-black dark:text-white">
      {/* <HomeHeader /> */}
      <div className="flex lg:h-[calc(100%-0px)] h-[calc(100%)] w-full justify-between flex-col-reverse lg:flex-row">
        <SideBar />
        {/* Botton naviagtion */}
        {children}
        {/* TODO - left bar for some data, add mobile view */}
        <div className="h-full px-4 w-[280px] pt-4 fixed right-0 hidden lg:block bg-amp-0 text-amp-300 dark:text-amp-700/80">
          <div className="text-md flex items-center w-full justify-end gap-3">
            <OptionItem icon={<TbMessage2Up size={22} />} />
            <OptionItem icon={<IoNotifications size={22} />} />
            <OptionItem icon={<IoPersonCircle size={22} />} />
          </div>

          <div className="my-4">
            <h2 className="">Popularne projekty</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

const OptionItem = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="flex items-center p-2 rounded-full bg-amp-700 dark:bg-amp-300 hover:opacity-70 cursor-pointer transition-transform-opacity">
      {icon}
    </div>
  );
};
