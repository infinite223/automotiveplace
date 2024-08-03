import Link from "next/link";
import { getGenerateStartData } from "../app/services/data";
import { AMPButton } from "../app/components/shared/AMPButton";

export default async function Home() {
  return (
    <main className="flex text-zinc-900 min-h-screen flex-col items-center p-2">
      <div className="flex items-center gap-3">
        <h3 className="font-extrabold text-[18px] uppercase">
          AutoMotive <span className="text-baseColor">place</span>
        </h3>

        <div></div>

        <Link href={"/test"} className="absolute top-2 right-2">
          <div className="border-teal-700 border py-1 p-2 rounded-md text-sm font-bold">
            TEST PAGE
          </div>
        </Link>
      </div>

      {/* <AMPButton
        name="Generate data"
        onClick={getGenerateStartData}
        // disabled={true}
      /> */}

      <div className="flex flex-col"></div>
    </main>
  );
}
