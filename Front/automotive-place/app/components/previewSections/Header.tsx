import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { Kalam } from "next/font/google"

const kalamBold = Kalam({
    subsets: ['latin'],
    display: 'swap',
    weight: '700'
})

const kalamMedium = Kalam({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})

const Header = () => {
  const t = useTranslations('Preview');


  return (
    <section className="flex h-screen flex-col items-center gap-4 justify-center relative">
      <h1
        className={`text-5xl font-extrabold `+ kalamBold.className}
      >
        <span className="text-baseColor-secendary uppercase">Automotive</span>{" "}
        PLACE
      </h1>
        <p className={`text-xl max-w-[60%] text-center ` +kalamMedium.className}>
            {t("title")}
        </p>
      <div className="flex gap-4 mt-4">
        <Link
          href={"./sign-up"}
          className="border-zinc-400 border-2 py-1.5 px-4 font-semibold rounded-sm text-sm"
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

        <div className={`absolute text-9xl scale-[2] z-[-1] opacity-15 ` + kalamBold.className}>
            AMP
        </div>
    </section>
  );
};

export default Header;
