"use client";

import { useState } from "react";
import { AMPInput } from "../../components/shared/AMPInput";
import { AMPButton } from "@/app/components/shared/AMPButton";
import Link from "next/link";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <main className="w-full items-center flex flex-col justify-center">
      <form className="w-[300px] gap-2 border-custom-primary bottom-1 flex flex-col">
        <div className="flex flex-col mb-10">
          <p className="text-xs font-thin">Witaj ponownie!</p>
          <h1 className="text-2xl font-bold">Zaloguj się</h1>
        </div>
        <div className="flex flex-col bordre-2">
          <AMPInput
            value={email}
            name="Email"
            type="email"
            placeholder="Podaj email"
            setValue={(text) => setEmail(text.toString())}
          />
          <AMPInput
            placeholder="Podaj hasło"
            value={password}
            type="password"
            name="Hasło"
            setValue={(text) => setPassword(text.toString())}
          />
        </div>
        <AMPButton
          name="Zaloguj"
          onClick={() => {}}
          additionalTailwindCss="bg-baseColor text-sm rounded-sm py-1.5"
        />
      </form>

      <footer className="mt-3">
        <p className="text-sm font-light">
          Nie masz jeszcze konta?
          <Link href={"./sign-up"} className="text-baseColor">
            {" "}
            Zarejestruj się
          </Link>
        </p>
      </footer>
    </main>
  );
}
