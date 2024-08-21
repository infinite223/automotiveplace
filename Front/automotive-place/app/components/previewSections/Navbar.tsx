"use client";

import React, { useEffect, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function CustomNavbar() {
  const [navbarBg, setNavbarBg] = useState("transparent");

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
        <p className="text-inherit font-extrabold ">A|M|P</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Nowości
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Kontakt
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Aplikacja mobilna
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Możliwości
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Subskrybcja
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <div className="flex gap-2">
          <Link
            href={"./sign-up"}
            className="border-zinc-700 border-2 py-1.5 px-4 font-semibold rounded-sm text-sm"
          >
            Utwórz konto
          </Link>
          <Link
            href={`./sign-in`}
            className="bg-baseColor-secendary text-white py-1.5 font-semibold px-4 rounded-sm text-sm"
          >
            Zaloguj się
          </Link>
        </div>
      </NavbarContent>
    </Navbar>
  );
}
