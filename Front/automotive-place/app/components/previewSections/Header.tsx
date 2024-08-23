import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { Kalam } from "next/font/google";

const kalamBold = Kalam({
  subsets: ["latin"],
  display: "swap",
  weight: "700",
});

const kalamMedium = Kalam({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const Header = () => {
  const t = useTranslations("Preview");

  return (
    <section className="custom-gradient flex h-screen flex-col items-center gap-4 justify-center relative">
      <h1 className={`text-6xl font-extrabold z-[2] ` + kalamBold.className}>
        <span className="text-white uppercase ">Automotive</span>{" "}
        <span style={{ color: "var(--redColor)" }}>PLACE</span>
      </h1>
      <p
        className={
          `text-xl max-w-[60%] text-center z-[2] text-white/85 ` +
          kalamMedium.className
        }
      >
        {t("title")}
      </p>
      <div className="flex text-md mt-2 z-[2] uppercase font-bold text-baseColor">
        Projekty, Spoty, Wydarzenia
      </div>

      <div
        className={
          `absolute text-5xl xl:text-9xl scale-[2] z-[1] opacity-15 ` +
          kalamBold.className
        }
      >
        AMP
      </div>
      {/* add car drows on background */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-10 z-[2]"
      >
        <path
          fill="#fff"
          d="M0,192L34.3,186.7C68.6,181,137,171,206,144C274.3,117,343,75,411,90.7C480,107,549,181,617,202.7C685.7,224,754,192,823,160C891.4,128,960,96,1029,69.3C1097.1,43,1166,21,1234,16C1302.9,11,1371,21,1406,26.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-12 z-[1]"
      >
        <path
          fill="var(--baseColor)"
          d="M0,192L34.3,186.7C68.6,181,137,171,206,144C274.3,117,343,75,411,90.7C480,107,549,181,617,202.7C685.7,224,754,192,823,160C891.4,128,960,96,1029,69.3C1097.1,43,1166,21,1234,16C1302.9,11,1371,21,1406,26.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg>
    </section>
  );
};

export default Header;
