import { getLoggedInUser } from "@/lib/actions/user.actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Miejsce gdzie użytkownik może trzymać swoje podzespoły samochodowe, projekty aut",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full">{children}</div>;
}
