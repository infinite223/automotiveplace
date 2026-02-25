import React, { useRef, useState } from "react";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPSelect } from "../../shared/AMPSelect";
import { AMPButton } from "../../shared/AMPButton";
import { AMPSeparator } from "../../shared/AMPSeparator";
import {
  TVisualModificationType,
  TVisualModificationCreate,
} from "@/app/utils/types/visualModification";
import { FiLayout, FiX, FiImage } from "react-icons/fi";
import { compressImageIfNeeded } from "@/app/services/compressImage";
import { checkImage } from "@/app/services/checkImage";

interface VisualModificationFormProps {
  modification: TVisualModificationCreate;
  index: number;
  onChange: (field: keyof TVisualModificationCreate, value: any) => void;
  onRemove: () => void;
  onAdd: () => void;
  isLast: boolean;
}

export const VisualModificationForm: React.FC<VisualModificationFormProps> = ({
  modification,
  index,
  onChange,
  onRemove,
  onAdd,
  isLast,
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const typeOptions = Object.values(TVisualModificationType).map((type) => ({
    label: type.replace(/_/g, " "),
    value: type,
  }));

  const handleFileChange = async (file: File | null) => {
    if (!file) return;

    setIsChecking(true);
    setIsBlocked(false);

    try {
      const fileName = `visual_${file.name}`;
      const compressedFile = await compressImageIfNeeded(file, fileName);
      const url = URL.createObjectURL(compressedFile);

      const imageEl = new window.Image();
      imageEl.src = url;
      await new Promise((res) => (imageEl.onload = res));
      const predictions = await checkImage(imageEl);

      const isNSFW = predictions.some(
        (p) =>
          (p.className === "Porn" && p.probability > 0.6) ||
          (p.className === "Hentai" && p.probability > 0.6) ||
          (p.className === "Sexy" && p.probability > 0.6),
      );

      if (isNSFW) {
        setIsBlocked(true);
        onChange("imageFile", null);
      } else {
        onChange("imageFile", compressedFile);
      }
    } catch (error) {
      console.error("Błąd podczas przetwarzania zdjęcia:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const removeImage = () => {
    onChange("imageFile", null);
    setIsBlocked(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="pt-4 flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold opacity-80">
          Modyfikacja #{index + 1}
        </span>
      </div>

      <div className="flex gap-4 w-full">
        <div className="w-2/3">
          <AMPInput
            required
            name="Nazwa modyfikacji"
            placeholder="np. Felgi BBS LM"
            value={modification.name}
            setValue={(v) => onChange("name", v.toString())}
          />
        </div>
        <div className="w-1/3">
          <AMPSelect
            title="Typ"
            value={modification.modificationType}
            setValue={(v) => onChange("modificationType", v)}
            options={typeOptions}
            required
            leftIcon={<FiLayout size={16} className="text-amp-300" />}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mb-2">
        <label className="text-[10px] uppercase opacity-60 ml-1 font-bold text-amp-300">
          Zdjęcie modyfikacji
        </label>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
        />

        <div
          className="relative min-h-32 w-full border border-dashed border-amp-300 rounded-md flex items-center justify-center cursor-pointer hover:bg-amp-300 transition overflow-hidden"
          onClick={() => !modification.imageFile && inputRef.current?.click()}
        >
          {!modification.imageFile && !isChecking && (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <FiImage size={24} />
              <span className="text-[10px]">Kliknij aby dodać zdjęcie</span>
            </div>
          )}

          {modification.imageFile && (
            <>
              <img
                src={URL.createObjectURL(modification.imageFile)}
                alt="Podgląd"
                className="w-full h-48 object-contain rounded-md p-1"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 hover:bg-black transition-colors"
              >
                <FiX size={14} />
              </button>
            </>
          )}

          {isChecking && (
            <div className="absolute inset-0 bg-black/50 text-white flex items-center justify-center text-xs">
              Sprawdzanie...
            </div>
          )}

          {isBlocked && (
            <div className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center text-[10px] text-center px-2">
              Zdjęcie niedozwolone (NSFW)
            </div>
          )}
        </div>
      </div>

      <AMPTextarea
        name="Opis (opcjonalnie)"
        placeholder="Opisz szczegóły modyfikacji wizualnej..."
        value={modification.description || ""}
        setValue={(v) => onChange("description", v.toString())}
      />

      <div className="flex gap-2 mt-2">
        <AMPButton
          type="none"
          name="Usuń modyfikację"
          onClick={onRemove}
          additionalTailwindCss="border border-amp-300/70 justify-center w-full text-xs"
        />
        {isLast && (
          <AMPButton
            type="secondary"
            name="Dodaj kolejną"
            onClick={onAdd}
            additionalTailwindCss="w-full justify-center text-xs"
          />
        )}
      </div>
      <AMPSeparator />
    </div>
  );
};
