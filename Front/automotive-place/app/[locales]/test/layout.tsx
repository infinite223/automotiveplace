import type { Metadata } from "next";
import TestNavigation from "./TestNavigation";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";

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
    <div className="bg-custom-primary min-h-screen text-custom-primary flex-col items-center gap-2">
      <TestNavigation />
      <AMPSeparator />
      {children}
    </div>
  );
}
