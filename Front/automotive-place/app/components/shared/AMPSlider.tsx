import React, { useState, useRef } from "react";
import AMPModal from "./AMPModal";
import { MdOutlineZoomOutMap } from "react-icons/md";

interface AMPSliderProps {
  images: string[];
  width: number;
  height: number;
}

const AMPSlider: React.FC<AMPSliderProps> = ({ images, width, height }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (imgContainerRef.current) {
      imgContainerRef.current.style.height = `${img.height}px`;
    }
  };

  return (
    <>
      <div
        ref={imgContainerRef}
        className="relative overflow-hidden"
        style={{ width, height }}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img
              key={`${currentIndex}-${index}`} // Wymuszenie nowego renderu po zmianie `currentIndex`
              src={image}
              alt={`slide-${index}`}
              className="flex-shrink-0 object-contain"
              style={{ width, height }}
              onLoad={handleImageLoad} // Aktualizacja wysokości kontenera po załadowaniu obrazu
            />
          ))}
        </div>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 px-2 rounded-full cursor-pointer left-2"
          onClick={handlePrevClick}
        >
          &#10094;
        </button>
        <button
          className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 px-2 rounded-full cursor-pointer right-2"
          onClick={handleNextClick}
        >
          &#10095;
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
          className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 px-2 rounded-full cursor-pointer"
          onClick={openModal}
        >
          <MdOutlineZoomOutMap />
        </button>
      </div>

      <AMPModal onClose={closeModal} visible={isModalOpen} withHeader={false}>
        <div className="flex justify-center items-center w-screen h-screen">
          <div
            className="relative max-w-[95vw] max-h-[95vh] overflow-hidden items-center"
            style={{ width: width * 2 }}
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
                  className="flex-shrink-0 object-contain max-w-full max-h-full"
                  onLoad={handleImageLoad}
                  style={{ width: width * 2 }}
                />
              ))}
            </div>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 px-2 rounded-full cursor-pointer left-2"
              onClick={handlePrevClick}
            >
              &#10094;
            </button>
            <button
              className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 px-2 rounded-full cursor-pointer right-2"
              onClick={handleNextClick}
            >
              &#10095;
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
          </div>
        </div>
      </AMPModal>
    </>
  );
};

export default AMPSlider;
