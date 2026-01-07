"use client";

import { checkImage } from "@/app/services/checkImage";
import React, { useEffect, useRef, useState } from "react";
import { AMPButton } from "../../shared/AMPButton";
import { compressImageIfNeeded } from "@/app/services/compressImage";
import { LoadingSpinner } from "../../loading/LoadingSpinner";

interface BasicDataStepProps {
  onPrev: () => void;
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
}

type ImageState = {
  file: File;
  url: string;
  status: "pending" | "ok" | "blocked";
};

export const ImagesDataStep = ({
  setIsValid,
  registerGetData,
}: BasicDataStepProps) => {
  const [images, setImages] = useState<ImageState[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    registerGetData?.(() => ({
      images: images
        .filter((img) => img.status === "ok")
        .map((img) => img.file),
    }));
  }, [images, registerGetData]);

  useEffect(() => {
    const hasBlocked = images.some((img) => img.status === "blocked");
    const hasValid = images.some((img) => img.status === "ok");

    const newValid = hasValid && !hasBlocked;

    setIsValid(newValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageState[] = [];

    for (const originalFile of Array.from(files)) {
      const file = await compressImageIfNeeded(originalFile, originalFile.name);

      const url = URL.createObjectURL(file);

      newImages.push({
        file,
        url,
        status: "pending",
      });
    }

    setImages((prev) => [...prev, ...newImages]);

    for (const img of newImages) {
      const imageEl = new Image();
      imageEl.src = img.url;

      await new Promise((res) => (imageEl.onload = res));

      const predictions = await checkImage(imageEl);

      const isNSFW = predictions.some(
        (p) =>
          (p.className === "Porn" && p.probability > 0.6) ||
          (p.className === "Hentai" && p.probability > 0.6) ||
          (p.className === "Sexy" && p.probability > 0.6)
      );

      setImages((prev) =>
        prev.map((p) =>
          p.url === img.url ? { ...p, status: isNSFW ? "blocked" : "ok" } : p
        )
      );
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => handleFiles(e.target.files)}
      />

      <AMPButton
        type="secondary"
        name="Dodaj zdjęcia"
        additionalTailwindCss="w-fit"
        onClick={() => inputRef.current?.click()}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {images.map((img, index) => (
          <div key={index} className="relative rounded-sm overflow-hidden">
            <img
              src={img.url}
              alt="upload"
              className="object-cover w-full h-32"
            />

            {img.status === "pending" && (
              <div className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-xs">
                <LoadingSpinner />
              </div>
            )}

            {img.status === "blocked" && (
              <div className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center text-xs text-center px-2">
                Zdjęcie niedozwolone (NSFW)
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
