import React, { useState, useEffect, useRef } from "react";
import { createStageStepSchema } from "@/app/api/zod.schmas";
import { TStepStageCreate } from "@/app/utils/types/stage";
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
        ],
  );
  const [errors, setErrors] = useState<StageErrors>({});
  const lastStageRef = useRef<HTMLDivElement>(null);

  const updateStage = (
    index: number,
    field: keyof TStepStageCreate,
    value: any,
  ) => {
    setStages((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
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
  }, [stages, setIsValid]);

  useEffect(() => {
    if (stages.length > 1 && lastStageRef.current) {
      lastStageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [stages.length]);

  useEffect(() => {
    registerGetData?.(() => stages);
  }, [stages, registerGetData]);

  return (
    <div className="flex flex-col gap-4 overflow-auto scroll-smooth h-[calc(100vh-180px)] pr-2 custom-scrollbar no-scrollbar">
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;
        return (
          <div
            key={index}
            ref={isLast ? lastStageRef : null}
            className="w-full"
          >
            <StageForm
              stage={stage}
              index={index}
              errors={errors[index]}
              onChange={(field, value) => updateStage(index, field, value)}
              onRemove={() => removeStage(index)}
              onAdd={addStage}
              lastStageIndex={stages.length}
            />
          </div>
        );
      })}
    </div>
  );
};
