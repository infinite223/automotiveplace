"use client";

import { useState } from "react";
import { HomeHeader } from "./HomeHeader";
import { HomeLeftOptions } from "./HomeLeftOptions";
import { HomeMainContent } from "./HomeMainContent";
import AMPModal from "../components/shared/AMPModal";
import { SelectCreateOption } from "../components/selectCreateOption";
import { contentData } from "../utils/data/contentData";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="flex flex-col items-center gap-2 p-2 bg-custom-primary text-custom-primary h-screen overflow-hidden">
      <HomeHeader />

      <div className="flex justify-between w-full h-full">
        <HomeLeftOptions openModal={openModal} closeModal={closeModal} />
        <HomeMainContent contentData={contentData} />
        <div></div>
      </div>

      <AMPModal
        onClose={closeModal}
        withHeader={false}
        visible={isModalOpen}
        title="Dodawanie"
      >
        <SelectCreateOption />
      </AMPModal>
    </main>
  );
}
