"use client";

import AMPImageZoomModal from "@/app/components/shared/AMPImageZoomModal";
import { getProjectImageSrcByFileId } from "@/app/utils/helpers/storageHelper";
import Image from "next/image";
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
        {images.map((imageId, index) => {
          const imgFullPath = getProjectImageSrcByFileId(imageId);
          if (!imgFullPath) return;

          return (
            <div
              key={index}
              className="relative w-full aspect-[4/3] overflow-hidden rounded-sm bg-gray-200 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <Image
                src={imgFullPath}
                alt={`Image ${index}`}
                className="absolute inset-0 object-cover"
                fill
              />
            </div>
          );
        })}
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
