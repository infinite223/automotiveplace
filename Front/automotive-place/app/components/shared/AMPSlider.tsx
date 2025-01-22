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
        <div className="flex justify-center items-center w-screen h-screen">
          <div
            className="relative max-w-[95vw] max-h-[95vh] overflow-hidden items-center w-full h-full"
            style={{ backgroundColor: dominantColor }}
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
                  className="flex-shrink-0 object-contain max-w-[95vw] max-h-[95vh] max-w-[95vw] w-full h-full"
                />
              ))}
            </div>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer left-2"
              onClick={handlePrevClick}
            >
              <FaAngleLeft size={iconSizes.base} />
            </button>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:opacity-70 text-white p-2 rounded-full cursor-pointer right-2"
              onClick={handleNextClick}
            >
              <FaAngleRight size={iconSizes.base} />
            </button>
            <button
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer hover:opacity-70"
              onClick={closeModal}
            >
              <MdClose size={iconSizes.base} />
            </button>
          </div>
        </div>
      </AMPModal>
    </>
  );
};

export default AMPSlider;
