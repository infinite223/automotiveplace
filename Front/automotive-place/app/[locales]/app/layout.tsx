import type { Metadata } from "next";
import { SideBar } from "../../components/shared/Sidebar";
import { redirect } from "next/navigation";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { getLocale } from "next-intl/server";
import { RightSidebar } from "@/app/components/rightSidebar";

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
    <div className="flex h-[100dvh] flex-col bg-amp-900 dark:bg-amp-0 text-black dark:text-white overflow-hidden">
      <div className="flex lg:h-[calc(100%-0px)] h-[100dvh] w-full justify-between flex-col lg:flex-row overflow-hidden">
        <SideBar />
        {children}
        <RightSidebar />
      </div>
    </div>
  );
}
