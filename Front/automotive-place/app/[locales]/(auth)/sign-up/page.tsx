"use client";

import { useState } from "react";
import { AMPInput } from "../../../components/shared/AMPInput";
import { AMPButton } from "@/app/components/shared/AMPButton";
import Link from "next/link";
import { signUp } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nick, setNick] = useState(""); // TODO - dodać w przyszłości do bazy itp

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const newUser = await signUp({ email, password, name });
    if (newUser) router.push("/");
  };

  return (
    <main className="w-full items-center flex flex-col justify-center">
      <form
        onSubmit={onSubmit}
        className="w-[300px] gap-2 border-custom-primary bottom-1 flex flex-col"
      >
        <div className="flex flex-col mb-10">
          <p className="text-xs font-thin">Witaj!</p>
          <h1 className="text-2xl font-bold">Utwórz konto</h1>
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
          <AMPInput
            placeholder="Podaj nazwę konta"
            value={name}
            type="text"
            name="Nazwa"
            setValue={(text) => setName(text.toString())}
          />
        </div>
        <AMPButton
          name="Zaloguj"
          onClick={() => {}}
          additionalTailwindCss="bg-baseColor text-sm rounded-sm py-1.5"
        />
      </form>

      <footer className="mt-3">
        <p className="text-xs font-light text-custom-secendary">
          Masz już konto?
          <Link href={"./sign-in"} className="text-baseColor">
            {" "}
            Zaloguj się
          </Link>
        </p>
      </footer>
    </main>
  );
}
