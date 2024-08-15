import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from "next/navigation";
import TestNavigation from "./TestNavigation";
import { AMPSeparator } from "@/app/components/shared/AMPSeparator";
// import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Test",
  description: "Test page",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const route = useRouter();
  return (
    <div className="bg-custom-primary min-h-screen text-custom-primary flex-col items-center gap-2">
      <TestNavigation />
      <AMPSeparator />
      {children}
    </div>
  );
}
