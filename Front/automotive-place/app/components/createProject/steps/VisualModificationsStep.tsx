import React, { useState, useEffect } from "react";
import {
  TVisualModificationCreate,
  TVisualModificationType,
} from "@/app/utils/types/visualModification";
import { VisualModificationForm } from "./VisualModificationForm";
import { AMPButton } from "../../shared/AMPButton";
import { StepProps } from "../../shared/Stepper/models";

export const VisualModificationsStep: React.FC<StepProps> = ({
  setIsValid,
  registerGetData,
  initialData,
}) => {
  const [modifications, setModifications] = useState<
    TVisualModificationCreate[]
  >(
    Array.isArray(initialData)
      ? (initialData as TVisualModificationCreate[])
      : [],
  );

  const addModification = () => {
    setModifications((prev) => [
      ...prev,
      {
        name: "",
        modificationType: TVisualModificationType.OTHER,
        description: "",
        isVisible: true,
        images: [],
      },
    ]);
  };

  const updateModification = (
    index: number,
    field: keyof TVisualModificationCreate,
    value: any,
  ) => {
    setModifications((prev) =>
      prev.map((mod, i) => (i === index ? { ...mod, [field]: value } : mod)),
    );
  };

  const removeModification = (index: number) => {
    setModifications((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const isValid =
      modifications.length > 0 &&
      modifications.every((m) => m.name.trim().length > 0);
    setIsValid(isValid || modifications.length === 0);
  }, [modifications, setIsValid]);

  useEffect(() => {
    registerGetData?.(() => modifications);
  }, [modifications, registerGetData]);

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-200px)] overflow-auto no-scrollbar pr-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold text-amp-100">
          Modyfikacje wizualne
        </h3>
        <AMPButton
          type="secondary"
          name="Dodaj modyfikację"
          additionalTailwindCss="text-xs"
          onClick={addModification}
        />
      </div>

      {modifications.length === 0 && (
        <p className="text-center opacity-50 text-sm mt-10">
          Nie dodano jeszcze żadnych modyfikacji wizualnych.
        </p>
      )}

      {modifications.map((mod, index) => (
        <VisualModificationForm
          key={index}
          index={index}
          modification={mod}
          isLast={index === modifications.length - 1}
          onChange={(field, value) => updateModification(index, field, value)}
          onRemove={() => removeModification(index)}
          onAdd={addModification}
        />
      ))}
    </div>
  );
};
