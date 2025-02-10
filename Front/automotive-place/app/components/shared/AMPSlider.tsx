import React, { useState, useRef, useEffect } from "react";
import AMPModal from "./AMPModal";
import { MdClose, MdOutlineZoomOutMap } from "react-icons/md";
import { calculateDominantColor } from "@/app/utils/helpers";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { iconSizes } from "@/app/utils/constants";

interface AMPSliderProps {
  images: string[];
}

const AMPSlider: React.FC<AMPSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dominantColor, setDominantColor] = useState("white");
  const imgContainerRef = useRef<HTMLDivElement>(null);

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
      const dominant = await calculateDominantColor(images[currentIndex]);
      setDominantColor(`rgb(${dominant})`);
    }, 10);
  }, [currentIndex, images]);

  return (
    <>
      <div
        ref={imgContainerRef}
        className="relative overflow-hidden transition-transform-colors-opacity group w-full h-full"
        style={{
          backgroundColor: dominantColor,
        }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={`${currentIndex}-${index}`}
              src={image}
              alt={`slide-${index}`}
              className="flex-shrink-0 object-contain w-full h-full my-auto"
              onDoubleClick={openModal}
            />
          ))}
        </div>

        {images.length > 1 && (
          <>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:opacity-70 text-white p-1 rounded-full cursor-pointer left-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handlePrevClick}
            >
              <FaAngleLeft size={iconSizes.small} />
            </button>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:opacity-70 text-white p-1 rounded-full cursor-pointer right-2 opacity-0 group-hover:opacity-100 transition-opacity"
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

      <AMPModal onClose={closeModal} visible={isModalOpen} withHeader={false}>
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-90">
          <div className="relative w-screen h-screen flex justify-center items-center">
            <button
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer hover:opacity-70"
              onClick={closeModal}
            >
              <MdClose size={iconSizes.base} />
            </button>

            {images.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full cursor-pointer"
                  onClick={handlePrevClick}
                >
                  <FaAngleLeft size={iconSizes.large} />
                </button>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full cursor-pointer"
                  onClick={handleNextClick}
                >
                  <FaAngleRight size={iconSizes.large} />
                </button>
              </>
            )}

            <div className="relative w-full h-full flex justify-center items-center">
              <img
                src={images[currentIndex]}
                alt={`slide-${currentIndex}`}
                className="object-contain w-full h-full max-w-screen max-h-screen"
              />
            </div>
          </div>
        </div>
      </AMPModal>
    </>
  );
};

export default AMPSlider;
