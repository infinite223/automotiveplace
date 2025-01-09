import React, { useState } from "react";

interface AMPSliderProps {
  images: string[];
  width: number;
  height: number;
}

const AMPSlider: React.FC<AMPSliderProps> = ({ images, width, height }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className="relative overflow-hidden" style={{ width, height }}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`slide-${index}`}
            className="flex-shrink-0"
            style={{ width, height }}
          />
        ))}
      </div>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer left-2"
        onClick={handlePrevClick}
      >
        &#10094;
      </button>
      <button
        className="absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 cursor-pointer right-2"
        onClick={handleNextClick}
      >
        &#10095;
      </button>
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 bg-black bg-opacity-50 rounded-full cursor-pointer ${index === currentIndex ? "bg-white" : ""}`}
            onClick={() => handleBulletClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default AMPSlider;
