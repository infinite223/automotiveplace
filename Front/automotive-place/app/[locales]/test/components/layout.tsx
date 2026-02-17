import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test components pages",
  description: "Test all components in app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
