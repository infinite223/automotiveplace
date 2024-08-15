import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const Header = () => {
  const t = useTranslations();

  return (
    <section className="flex h-screen flex-col items-center gap-8 justify-center">
      <h1
        className="text-5xl font-extrabold"
        style={{ fontFamily: "fantasy3" }}
      >
        <span className="text-baseColor-secendary uppercase">Automotive</span>{" "}
        place {t("home")}
      </h1>
      <div className="flex gap-4">
        <Link
          href={"./sign-up"}
          className="border-zinc-600 border-2 py-1.5 px-4 rounded-sm text-sm"
        >
          Utwórz konto
        </Link>
        <Link
          href={`./sign-in`}
          className="bg-baseColor-secendary text-white py-1.5 px-4 rounded-sm text-sm"
        >
          Zaloguj się
        </Link>
      </div>
    </section>
  );
};

export default Header;
