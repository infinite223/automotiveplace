"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import Logo from "../../../asets/logo_2.png";
import Image from "next/image";
import { Yant } from "@/app/utils/helpers";

const navOptions = [
  {
    name: "Nowość",
    path: "",
  },
  {
    name: "Kontakt",
    path: "",
  },
  {
    name: "Aplikacja mobilna",
    path: "",
  },
  {
    name: "Możliwości",
    path: "",
  },
  {
    name: "Subskrybcja",
    path: "",
  },
];

export default function CustomNavbar({
  isLogged = false,
}: {
  isLogged: boolean;
}) {
  const [navbarBg, setNavbarBg] = useState("transparent");
  const t = useTranslations();

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerHeight / 4;

      if (window.scrollY > scrollThreshold) {
        setNavbarBg("white");
      } else {
        setNavbarBg("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar shouldHideOnScroll className="p-2 px-0 fixed z-20 shadow-sm">
      <NavbarBrand>
        {/* <pa
          className={` font-extrabold ${navbarBg === "transparent" ? "text-amp-900" : "text-amp-300"}`}
        >
          A|M|P
        </p> */}
        <div className="flex gap-4 items-center ml-[-7px]">
          <Image
            src={Logo}
            alt="logo"
            width={35}
            height={35}
            className="rounded-lg ml-[-5px]"
          />
          <span
            className={
              `text-md hidden sm:flex ` +
              Yant.className +
              (navbarBg === "transparent" ? " text-amp-700" : " text-amp-100")
            }
          >
            AMP
          </span>
        </div>{" "}
      </NavbarBrand>
      <NavbarContent className={`hidden sm:flex gap-4 `} justify="center">
        {navOptions.map(({ name }, id) => (
          <NavbarItem key={id}>
            <Link
              color="foreground"
              className={`${navbarBg === "transparent" ? "text-amp-700 hover:text-amp-900" : "text-amp-100 hover:text-amp-300"}`}
              href="#"
            >
              {name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <div className="flex gap-2 mr-[-10px]">
          <Link
            href={"./sign-up"}
            className={`border-1.5 py-1.5 px-4 font-semibold rounded-sm text-sm ${navbarBg === "transparent" ? "text-amp-700 hover:text-amp-900 border-amp-700" : "text-amp-100 hover:text-amp-300 border-amp-300"}`}
          >
            {t("Core.CreateAccount")}
          </Link>
          <Link
            href={isLogged ? `./app` : `./sign-in`}
            className="bg-amp-500 text-white py-1.5 font-semibold px-4 rounded-sm text-sm"
          >
            {t(isLogged ? "Core.GoToApp" : "Core.SignIn")}
          </Link>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
