"use server";

import { AllanBold, KalamBold } from "@/app/utils/helpers";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Header = ({ isLogged = false }: { isLogged: boolean }) => {
  const t = useTranslations();

  console.log(isLogged);
  return (
    <section className="custom-gradient flex h-screen flex-col items-center gap-4 justify-center relative">
      <h1
        className={
          `text-center text-7xl font-extrabold z-[2] ` + AllanBold.className
        }
      >
        <span className="text-white ">Automotive</span>{" "}
        <span style={{ color: "var(--redColor)" }}>place</span>
      </h1>
      <p
        className={
          `text-3xl max-w-[85%] text-center z-[2] mt-4 text-white/85 ` +
          KalamBold.className
        }
      >
        {t("Preview.title")}
      </p>

      <div className="flex items-center gap-4 text-lg mt-4">
        <Link
          href={`./sign-in`}
          className="text-white py-2 font-semibold px-6 rounded-sm border-amp-700 border-1"
        >
          {t(isLogged ? "Core.GoToApp" : "Core.SignIn")}
        </Link>
        <Link
          href={`./sign-in`}
          className="bg-amp-500 text-white py-2 font-semibold px-6 rounded-sm"
        >
          {t("Preview.SeeDemoVesion")}
        </Link>
      </div>

      {/* TODO - change this to cards with some data about  Projekty, Spoty, Wydarzenia*/}
      {/* <div className="flex text-md mt-2 z-[2] uppercase font-bold text-amp-700 dark:text-amp-300">
        Projekty, Spoty, Wydarzenia
      </div> */}

      {/* <div
        className={
          `absolute text-8xl xl:text-9xl scale-[2] z-[1] opacity-15 ` +
          kalamBold.className
        }
      >
        AMP
      </div> */}
      {/* add car drows on background */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 z-[2]"
      >
        <path
          fill="#fff"
          d="M0,192L34.3,186.7C68.6,181,137,171,206,144C274.3,117,343,75,411,90.7C480,107,549,181,617,202.7C685.7,224,754,192,823,160C891.4,128,960,96,1029,69.3C1097.1,43,1166,21,1234,16C1302.9,11,1371,21,1406,26.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg> */}
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-12 z-[1]"
      >
        <path
          fill="var(--baseColor)"
          d="M0,192L34.3,186.7C68.6,181,137,171,206,144C274.3,117,343,75,411,90.7C480,107,549,181,617,202.7C685.7,224,754,192,823,160C891.4,128,960,96,1029,69.3C1097.1,43,1166,21,1234,16C1302.9,11,1371,21,1406,26.7L1440,32L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"
        ></path>
      </svg> */}
    </section>
  );
};

export default Header;
