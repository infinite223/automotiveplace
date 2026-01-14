import React, { useState, useRef, useEffect } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { iconSizes } from "@/app/utils/constants";
import AMPImageZoomModal from "./AMPImageZoomModal";
import Image from "next/image";
import { calculateDominantColor } from "@/app/utils/helpers/colorHelper";
import { getProjectImageSrcByFileId } from "@/app/utils/helpers/storageHelper";

interface AMPSliderProps {
  images: string[];
}

const AMPSlider: React.FC<AMPSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dominantColor, setDominantColor] = useState("white");
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SWIPE_THRESHOLD = 50;

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleBulletClick = (index: number) => {
    setCurrentIndex(index);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setTimeout(async () => {
      if (!images && !images[currentIndex]) return;
      try {
        const dominant = await calculateDominantColor(images[currentIndex]);
        setDominantColor(`rgb(${dominant})`);
      } catch (error) {
        console.error(error);
      }
    }, 10);
  }, [currentIndex, images]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) {
      return;
    }

    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX > 0) {
      handleNextClick();
    } else {
      handlePrevClick();
    }
  };

  return (
    <>
      <div
        ref={imgContainerRef}
        className="relative overflow-hidden transition-transform-colors-opacity group w-full h-full"
        style={{
          backgroundColor: dominantColor,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((imageId, index) => {
            const imgFullPath = getProjectImageSrcByFileId(imageId);
            if (!imgFullPath) return;

            return (
              <Image
                key={index}
                src={imgFullPath}
                alt={`slide-${index}`}
                width={1200}
                height={800}
                className="flex-shrink-0 object-contain w-full h-full my-auto"
                onDoubleClick={openModal}
                priority={index === 0}
              />
            );
          })}
        </div>

        {images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 z-[9] bg-black bg-opacity-50 hover:opacity-70 text-white p-1 rounded-full cursor-pointer left-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handlePrevClick}
            >
              <FaAngleLeft size={iconSizes.small} />
            </button>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 z-[9] bg-black bg-opacity-50 hover:opacity-70 text-white p-1 rounded-full cursor-pointer right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleNextClick}
            >
              <FaAngleRight size={iconSizes.small} />
            </button>
          </>
        )}

        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 bg-black bg-opacity-50 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-white" : ""
              }`}
              onClick={() => handleBulletClick(index)}
            ></span>
          ))}
        </div>
        <button
          className="absolute top-2 right-2 bg-black bg-opacity-50 hover:opacity-70 text-white p-2 rounded-full cursor-pointer"
          onClick={openModal}
        >
          <MdOutlineZoomOutMap />
        </button>
      </div>

      <AMPImageZoomModal
        images={images}
        currentIndex={currentIndex}
        onClose={closeModal}
        onPrev={handlePrevClick}
        onNext={handleNextClick}
        visible={isModalOpen}
      />
    </>
  );
};

export default AMPSlider;
