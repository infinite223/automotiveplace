import React, { useRef } from "react";
import AMPModal from "./AMPModal";
import { MdClose } from "react-icons/md";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { iconSizes } from "@/app/utils/constants";
import Image from "next/image";
import { getProjectImageSrcByFileId } from "@/app/utils/helpers/storageHelper";

interface AMPImageZoomModalProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  visible: boolean;
}

const AMPImageZoomModal: React.FC<AMPImageZoomModalProps> = ({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  visible,
}) => {
  const imgFullPath = getProjectImageSrcByFileId(images[currentIndex]);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const SWIPE_THRESHOLD = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX > 0) {
      onNext();
    } else {
      onPrev();
    }
  };

  return (
    <AMPModal onClose={onClose} visible={visible} withHeader={false}>
      <div
        className="fixed inset-0 z-40 flex justify-center items-center bg-black bg-opacity-90"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-screen h-[100dvh] flex justify-center items-center">
          <button
            className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer hover:opacity-70"
            onClick={onClose}
          >
            <MdClose size={iconSizes.base} />
          </button>

          {images.length > 1 && (
            <>
              <button
                className="z-10 absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
                onClick={onPrev}
              >
                <FaAngleLeft size={iconSizes.base} />
              </button>
              <button
                className="z-10 absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full cursor-pointer"
                onClick={onNext}
              >
                <FaAngleRight size={iconSizes.base} />
              </button>
            </>
          )}

          <div className="relative w-full h-full flex justify-center items-center">
            <Image
              src={imgFullPath ?? ""}
              alt={`slide-${currentIndex}`}
              className="object-contain max-w-screen max-h-screen"
              fill
            />
          </div>
        </div>
      </div>
    </AMPModal>
  );
};

export default AMPImageZoomModal;
