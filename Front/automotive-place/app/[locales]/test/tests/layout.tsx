import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test app",
  description: "Managment all tests in app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
