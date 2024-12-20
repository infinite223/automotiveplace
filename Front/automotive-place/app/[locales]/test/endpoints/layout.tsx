import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test all endpoints",
  description: "All endpoints in one place",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
