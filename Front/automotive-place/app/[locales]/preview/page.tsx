// import React from "react";
// import Header from "../../components/previewSections/Header";
// import About from "../../components/previewSections/About";
// import Services from "../../components/previewSections/Services";
// import PreviewTests from "../../components/previewSections/PreviewTests";
// import Footer from "../../components/previewSections/Footer";
// import CustomNavbar from "@/app/components/previewSections/Navbar";
// import { getLoggedInUser } from "@/lib/actions/user.actions";

import { useTranslations } from "next-intl";
import Link from "next/link";

// export default async function page() {
//   const user = await getLoggedInUser();

//   return (
//     <main>
//       <CustomNavbar isLogged={!!user} />
//       <Header isLogged={!!user} />
//       <About />
//       <Services />
//       <PreviewTests />
//       <Footer />
//     </main>
//   );
// }

export default function HomePage() {
  const t = useTranslations();

  return (
    <main className="bg-black text-white">
      <section className="relative h-[95vh] flex items-end">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1493238792000-8113da705763"
            alt="Car"
            className="w-full h-full object-cover brightness-[.35]"
          />
        </div>

        <div className="relative z-10 p-6 max-w-xl">
          <h1 className="text-4xl font-bold leading-tight">
            Your Garage. <br /> Your Community.
          </h1>

          <p className="mt-4 text-white/70 text-sm">
            Build your car profile, share progress and connect with real people.
          </p>

          <div className="flex items-center  flex-wrap max-w-[60vw] gap-4 text-lg mt-4">
            <Link
              href={`./sign-in`}
              className="text-white py-2 font-semibold px-6 rounded-sm border-amp-700 border-1"
            >
              {t("Preview.SeeDemoVesion")}
            </Link>
            <Link
              href={true ? `./app` : `./sign-in`}
              className="bg-amp-500 text-white py-2 font-semibold px-6 rounded-sm"
            >
              {t(true ? "Core.GoToApp" : "Core.SignIn")}
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-neutral-950 py-16 px-6">
        <h2 className="text-2xl font-semibold">Discover inspiring builds</h2>
        <p className="text-white/60 mt-3 text-sm max-w-md">
          Explore detailed projects with parts, specs and real-world progress.
        </p>

        <div className="mt-8 mx-auto max-w-xs rounded-3xl overflow-hidden border border-neutral-800">
          <img
            src="https://via.placeholder.com/400x600"
            alt="App preview"
            className="w-full"
          />
        </div>
      </section>

      <section className="bg-gradient-to-b from-neutral-900 to-black py-16 px-6">
        <h2 className="text-2xl font-semibold">Connect with the scene</h2>
        <p className="text-white/60 mt-3 text-sm max-w-md">
          Follow creators and explore car culture around the world.
        </p>

        <div className="mt-8 mx-auto max-w-xs rounded-3xl overflow-hidden border border-neutral-800">
          <img
            src="https://via.placeholder.com/400x600"
            alt="Feed preview"
            className="w-full"
          />
        </div>
      </section>

      <section className="bg-neutral-950 py-16 px-6">
        <h2 className="text-2xl font-semibold">Find local car meets</h2>
        <p className="text-white/60 mt-3 text-sm max-w-md">
          Discover events and meetups on a dynamic interactive map.
        </p>

        <div className="mt-8 mx-auto max-w-xs rounded-3xl overflow-hidden border border-neutral-800">
          <img
            src="https://via.placeholder.com/400x600"
            alt="Map preview"
            className="w-full"
          />
        </div>
      </section>

      <section className="bg-black py-20 px-6 text-center flex flex-col items-center">
        <h2 className="text-3xl font-bold">Ready to join the grid?</h2>
        <p className="text-white/60 mt-4 text-sm">
          Join thousands of car enthusiasts worldwide.
        </p>

        <Link
          href={`./sign-up`}
          className="bg-amp-500 text-white py-2 font-semibold px-6 rounded-sm mt-4"
        >
          {t("Core.SignUp")}
        </Link>
      </section>

      <footer className="text-center text-white/40 text-xs py-10">
        © 2025 Automotiveplace
      </footer>
    </main>
  );
}
