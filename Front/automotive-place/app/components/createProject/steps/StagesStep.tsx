import React, { useState, useEffect } from "react";
import { createStageSchema, createStageStepSchema } from "@/app/api/zod.schmas";
import { TStageCreate, TStepStageCreate } from "@/app/utils/types/stage";
import { ZodIssue } from "zod";
import { StageForm } from "./StageForm";

type StageErrors = Record<number, ZodIssue[]>;

interface StagesStepProps {
  onPrev: () => void;
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
  initialData?: any;
}

export const StagesStep: React.FC<StagesStepProps> = ({
  setIsValid,
  registerGetData,
  initialData = [],
}) => {
  const [stages, setStages] = useState<TStepStageCreate[]>(
    initialData?.length
      ? initialData
      : [
          {
            name: "SERIA",
            description: "Parametry seryjne pojazdu przed modyfikacjami",
            stageNumber: 0,
            hp: "",
            nm: "",
            carItems: [],
          },
        ]
  );
  const [errors, setErrors] = useState<StageErrors>({});

  const updateStage = (
    index: number,
    field: keyof TStepStageCreate,
    value: any
  ) => {
    setStages((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const addStage = () => {
    setStages((prev) => [
      ...(prev || []),
      {
        name: "",
        description: "",
        stageNumber: prev?.length.toString(),
        hp: "",
        nm: "",
        carItems: [],
      },
    ]);
  };

  const removeStage = (index: number) => {
    if (index === 0) return;
    setStages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const newErrors: StageErrors = {};
    let valid = true;

    stages.forEach((stage, index) => {
      const result = createStageStepSchema.safeParse(stage);
      if (!result.success) {
        valid = false;
        newErrors[index] = result.error.errors;
      }
    });

    setErrors(newErrors);
    setIsValid(valid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages]);

  useEffect(() => {
    registerGetData?.(() => stages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages, registerGetData]);

  return (
    <div className="flex flex-col gap-4 overflow-auto scroll-smooth h-[calc(100vh-180px)] pr-2 custom-scrollbar no-scrollbar">
      {stages.map((stage, index) => (
        <StageForm
          key={index}
          stage={stage}
          index={index}
          errors={errors[index]}
          onChange={(field, value) => updateStage(index, field, value)}
          onRemove={() => removeStage(index)}
          onAdd={addStage}
        />
      ))}
    </div>
  );
};
