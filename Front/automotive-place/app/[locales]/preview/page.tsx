import React from "react";
import Header from "../../components/previewSections/Header";
import About from "../../components/previewSections/About";
import Services from "../../components/previewSections/Services";
import PreviewTests from "../../components/previewSections/PreviewTests";
import Footer from "../../components/previewSections/Footer";

export default function page() {
  return (
    <main>
      <Header />
      <About />
      <Services />
      <PreviewTests />
      <Footer />
    </main>
  );
}
