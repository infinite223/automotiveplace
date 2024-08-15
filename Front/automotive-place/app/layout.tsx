import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "intersection-observer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automotive place",
  description: "Aplikacja społecznościowa dla miłośników motoryzacji ",
};
type Props = {
  children: ReactNode;
};
export default function RootLayout({ children }: Props) {
  return children;
}
