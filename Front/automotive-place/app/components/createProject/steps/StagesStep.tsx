import React, { useState, useEffect } from "react";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { createStageSchema } from "@/app/api/zod.schmas";
import { TStageCreate } from "@/app/utils/types/stage";

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
  const [stages, setStages] = useState<TStageCreate[]>(initialData);

  const updateStage = (
    index: number,
    field: keyof TStageCreate,
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
        stageNumber: prev.length + 1,
        hp: 0,
        nm: 0,
        acc_0_100: 0,
        acc_100_200: 0,
        acc_50_150: 0,
        sl_150_50: 0,
        sl_100_0: 0,
        stagePrice: 0,
        carItems: [],
      },
    ]);
  };

  const removeStage = (index: number) => {
    setStages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const allValid = stages?.every(
      (s) => createStageSchema.safeParse(s).success
    );
    setIsValid(allValid);
  }, [stages, setIsValid]);

  useEffect(() => {
    registerGetData?.(() => stages);
  }, [stages, registerGetData]);

  return (
    <div className="flex flex-col gap-4 overflow-auto h-[calc(100vh-180px)] pr-2">
      <h3 className="text-lg font-semibold">Etapy modyfikacji</h3>

      {stages?.map((stage, index) => (
        <div
          key={index}
          className="border border-gray-300 dark:border-neutral-600 p-4 rounded flex flex-col gap-2"
        >
          <div className="flex gap-4 w-full">
            <div className="w-1/2">
              <AMPInput
                type="text"
                placeholder="Nazwa etapu"
                name={`Stage ${index + 1} Name`}
                value={stage.name}
                setValue={(v) => updateStage(index, "name", v)}
              />
            </div>
            <div className="w-1/2">
              <AMPInput
                type="number"
                placeholder="Numer etapu"
                name={`Stage ${index + 1} Number`}
                value={stage.stageNumber}
                setValue={(v) => updateStage(index, "stageNumber", Number(v))}
              />
            </div>
          </div>

          <AMPTextarea
            name={`Stage ${index + 1} Description`}
            placeholder="Opis etapu"
            value={stage.description}
            setValue={(v) => updateStage(index, "description", v)}
          />

          <div className="flex gap-4 w-full">
            <AMPInput
              type="number"
              placeholder="HP"
              name={`Stage ${index + 1} HP`}
              value={stage.hp}
              setValue={(v) => updateStage(index, "hp", Number(v))}
            />
            <AMPInput
              type="number"
              placeholder="Nm"
              name={`Stage ${index + 1} Nm`}
              value={stage.nm}
              setValue={(v) => updateStage(index, "nm", Number(v))}
            />
          </div>

          {/* Dodaj inne pola według schematu: acc_0_100, acc_100_200, etc. */}

          <button
            type="button"
            className="text-red-500 mt-2"
            onClick={() => removeStage(index)}
          >
            Usuń etap
          </button>
        </div>
      ))}

      <button
        type="button"
        className="mt-4 bg-amp-200 dark:bg-amp-300/20 px-4 py-2 rounded"
        onClick={addStage}
      >
        Dodaj etap
      </button>
    </div>
  );
};
