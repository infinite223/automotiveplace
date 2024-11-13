import { Kalam, Permanent_Marker } from "next/font/google";
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

export { AllanBold, KalamBold };
