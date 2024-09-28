import React from "react";
import Header from "../../components/previewSections/Header";
import About from "../../components/previewSections/About";
import Services from "../../components/previewSections/Services";
import PreviewTests from "../../components/previewSections/PreviewTests";
import Footer from "../../components/previewSections/Footer";
import CustomNavbar from "@/app/components/previewSections/Navbar";

export default function page() {
  return (
    <main>
      <CustomNavbar />
      <Header />
      <About />
      <Services />
      <PreviewTests />
      <Footer />
    </main>
  );
}
