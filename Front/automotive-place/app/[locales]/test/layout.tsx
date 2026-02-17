import type { Metadata } from "next";
import TestNavigation from "./TestNavigation";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Test",
  description: "Test page",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-amp-900 dark:bg-amp-0min-h-screen bg-amp-000 dark:bg-amp-900 flex-col items-center gap-2">
      <TestNavigation />
      <AMPSeparator />
      {children}
    </div>
  );
}
