import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "intersection-observer";
import { Providers } from "./StoreProvider";
import { Notification } from "./components/logger/Notification";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automotive place",
  description: "Aplikacja społecznościowa dla miłośników motoryzacji ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Notification />
          {children}
        </Providers>
      </body>
    </html>
  );
}
