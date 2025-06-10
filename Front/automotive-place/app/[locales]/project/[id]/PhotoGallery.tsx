"use client";

import AMPImageZoomModal from "@/app/components/shared/AMPImageZoomModal";
import { useState } from "react";

interface PhotoGalleryProps {
  images: string[];
}

export default function PhotoGallery({ images }: PhotoGalleryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img
              src={src}
              alt={`Image ${index}`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <AMPImageZoomModal
        images={images}
        currentIndex={currentIndex}
        onClose={closeModal}
        onPrev={handlePrev}
        onNext={handleNext}
        visible={isModalOpen}
      />
    </>
  );
}
