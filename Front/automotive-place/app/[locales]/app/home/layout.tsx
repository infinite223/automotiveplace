import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Miejsce gdzie użytkownik może trzymać swoje podzespoły samochodowe, projekty aut",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full">{children}</div>;
}
