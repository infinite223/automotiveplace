"use client";

import React, { useRef, useState } from "react";
import { checkImage } from "@/app/services/checkImage";
import { FiX } from "react-icons/fi";
import Image from "next/image";
import { compressImageIfNeeded } from "@/app/services/compressImage";
import { LuChartSpline } from "react-icons/lu";

type ImageState = {
  file: File;
  url: string;
  status: "pending" | "ok" | "blocked";
};

interface Props {
  value?: File | null;
  onChange: (file: File | null) => void;
}

export const StageChartImageUpload: React.FC<Props> = ({ onChange }) => {
  const [image, setImage] = useState<ImageState | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | null) => {
    if (!file) return;

    const fileName = `dyno_${file.name}`;
    const compressedFile = await compressImageIfNeeded(file, fileName);

    const url = URL.createObjectURL(compressedFile);

    const imgState: ImageState = {
      file: compressedFile,
      url,
      status: "pending",
    };

    setImage(imgState);

    const imageEl = new window.Image();
    imageEl.src = url;
    await new Promise((res) => (imageEl.onload = res));

    const predictions = await checkImage(imageEl);

    const isNSFW = predictions.some(
      (p) =>
        (p.className === "Porn" && p.probability > 0.6) ||
        (p.className === "Hentai" && p.probability > 0.6) ||
        (p.className === "Sexy" && p.probability > 0.6)
    );

    if (isNSFW) {
      setImage({ ...imgState, status: "blocked" });
      onChange(null);
    } else {
      setImage({ ...imgState, status: "ok" });
      onChange(compressedFile);
    }
  };

  const removeImage = () => {
    setImage(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm">
        Tutaj możesz dodać zdjęcie wykresu z hamowni na potwierdzenie danych
      </p>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      <div
        className="relative min-h-48 w-full border border-dashed border-amp-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-amp-300 transition"
        onClick={() => !image && inputRef.current?.click()}
      >
        {!image && (
          <div className="flex flex-col items-center gap-2 text-gray-400">
            <LuChartSpline size={32} />

            <span className="text-xs">Kliknij aby dodać zdjęcie wykresu</span>
          </div>
        )}

        {image && (
          <>
            <Image
              src={image.url}
              alt="Wykres z hamowni"
              width={800}
              height={600}
              style={{ width: "100%", height: "auto" }}
              className="rounded-md object-contain"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                removeImage();
              }}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black"
            >
              <FiX size={14} />
            </button>

            {image.status === "pending" && (
              <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-xs">
                Sprawdzanie...
              </div>
            )}

            {image.status === "blocked" && (
              <div className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center text-xs text-center px-2">
                Zdjęcie niedozwolone (NSFW)
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
