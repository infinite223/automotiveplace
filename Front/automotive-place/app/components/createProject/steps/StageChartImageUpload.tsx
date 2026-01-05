"use client";

import React, { useRef, useState } from "react";
import { checkImage } from "@/app/services/checkImage";
import { AMPButton } from "../../shared/AMPButton";

type ImageState = {
  file: File;
  url: string;
  status: "pending" | "ok" | "blocked";
};

interface Props {
  value?: File | null;
  onChange: (file: File | null) => void;
}

export const StageChartImageUpload: React.FC<Props> = ({ value, onChange }) => {
  const [image, setImage] = useState<ImageState | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File | null) => {
    if (!file) return;

    const url = URL.createObjectURL(file);

    const imgState: ImageState = {
      file,
      url,
      status: "pending",
    };

    setImage(imgState);

    const imageEl = new Image();
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
      onChange(file);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
      />

      <AMPButton
        type="secondary"
        name="Dodaj wykres (hamownia)"
        onClick={() => inputRef.current?.click()}
      />

      {image && (
        <div className="relative w-full h-40 rounded overflow-hidden">
          <img src={image.url} className="object-contain w-full h-full" />

          {image.status === "pending" && (
            <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-xs">
              Sprawdzanie...
            </div>
          )}

          {image.status === "blocked" && (
            <div className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center text-xs">
              Zdjęcie niedozwolone (NSFW)
            </div>
          )}
        </div>
      )}
    </div>
  );
};
