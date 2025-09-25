import { Kalam, Permanent_Marker, Yantramanav } from "next/font/google";

const KalamBold = Kalam({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});
const AllanBold = Permanent_Marker({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Yant = Yantramanav({
  subsets: ["latin-ext"],
  display: "swap",
  weight: "900",
});

export { AllanBold, KalamBold, Yant };
