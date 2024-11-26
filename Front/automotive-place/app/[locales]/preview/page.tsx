import React from "react";
import Header from "../../components/previewSections/Header";
import About from "../../components/previewSections/About";
import Services from "../../components/previewSections/Services";
import PreviewTests from "../../components/previewSections/PreviewTests";
import Footer from "../../components/previewSections/Footer";
import CustomNavbar from "@/app/components/previewSections/Navbar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function page() {
  const user = await getLoggedInUser();

  return (
    <main>
      <CustomNavbar isLogged={!!user} />
      <Header isLogged={!!user} />
      <About />
      <Services />
      <PreviewTests />
      <Footer />
    </main>
  );
}
