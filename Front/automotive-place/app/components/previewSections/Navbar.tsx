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
    <Navbar
      shouldHideOnScroll
      className="p-2 fixed z-20 shadow-sm"
      style={{ backgroundColor: navbarBg, transition: "background-color 0.3s" }}
    >
      <NavbarBrand>
        <p
          className={` font-extrabold ${navbarBg === "transparent" ? "text-amp-900" : "text-amp-300"}`}
        >
          A|M|P
        </p>
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
        <div className="flex gap-2">
          <Link
            href={"./sign-up"}
            className={`border-1.5 py-1.5 px-4 font-semibold rounded-sm text-sm ${navbarBg === "transparent" ? "text-amp-700 hover:text-amp-900 border-amp-700" : "text-amp-100 hover:text-amp-300 border-amp-300"}`}
          >
            {t("Core.CreateAccount")}
          </Link>
          <Link
            href={`./sign-in`}
            className="bg-amp-500 text-white py-1.5 font-semibold px-4 rounded-sm text-sm"
          >
            {t(isLogged ? "Core.GoToApp" : "Core.SignIn")}
          </Link>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
