// Home.js
import { HomeHeader } from "./HomeHeader";
import { HomeLeftOptions } from "./HomeLeftOptions";
import { HomeMainContent } from "./HomeMainContent";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-2 p-2 bg-custom-primary text-custom-primary h-screen overflow-hidden">
      <HomeHeader />

      <div className="flex justify-between w-full h-full">
        <HomeLeftOptions />
        <HomeMainContent />
        <div></div>
      </div>
    </main>
  );
}
