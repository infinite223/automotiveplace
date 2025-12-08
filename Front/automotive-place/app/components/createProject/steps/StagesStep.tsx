import React, { useState, useEffect } from "react";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { createStageSchema } from "@/app/api/zod.schmas";
import { TStageCreate } from "@/app/utils/types/stage";
import { AMPButton } from "../../shared/AMPButton";
import { AMPSeparator } from "../../shared/AMPSeparator";

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
  const [stages, setStages] = useState<TStageCreate[]>(
    initialData?.length
      ? initialData
      : [
          {
            name: "Stage 0 – seria",
            description: "Parametry seryjne pojazdu przed modyfikacjami",
            stageNumber: 0,
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
        ]
  );

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
        stageNumber: prev?.length,
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
    if (index === 0) return;
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
    <div className="flex flex-col gap-4 overflow-auto h-[calc(100vh-180px)] pr-2 custom-scrollbar">
      {stages?.map((stage, index) => (
        <div
          key={index}
          className="pt-4 border-t border-amp-700/50 dark:border-amp-300 flex flex-col gap-2"
        >
          {index === 0 && (
            <div className="text-sm text-amp-500 font-semibold mb-2">
              Stage 0 – dane bazowe pojazdu (przed modyfikacjami)
            </div>
          )}

          <div className="flex gap-4 w-full">
            <div className="w-1/2">
              <AMPInput
                type="text"
                placeholder="Nazwa etapu np. modyfikacja sterownika"
                name={`Nazwa modyfikacji`}
                value={stage.name}
                setValue={(v) => updateStage(index, "name", v)}
              />
            </div>
            <div className="w-1/2">
              <AMPInput
                type="number"
                placeholder="Numer etapu"
                name={`Numer etapu`}
                value={stage.stageNumber}
                setValue={(v) => updateStage(index, "stageNumber", Number(v))}
              />
            </div>
          </div>

          <AMPTextarea
            name={`Opis etapu`}
            placeholder="Możesz tutaj opisać co zostało zmodyfikowane..."
            value={stage.description}
            setValue={(v) => updateStage(index, "description", v)}
          />

          <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 w-full">
            <AMPInput
              type="number"
              placeholder="HP"
              name={`Moc silnika`}
              value={stage.hp}
              setValue={(v) => updateStage(index, "hp", Number(v))}
            />

            <AMPInput
              type="number"
              placeholder="Nm"
              name={`Moment obrotowy`}
              value={stage.nm}
              setValue={(v) => updateStage(index, "nm", Number(v))}
            />

            <AMPInput
              type="number"
              placeholder="0–100 km/h"
              name={`Przyśpieszenie 0-100km/h (s)`}
              value={stage.acc_0_100}
              setValue={(v) => updateStage(index, "acc_0_100", Number(v))}
            />

            <AMPInput
              type="number"
              placeholder="100–200 km/h"
              name={`Przyśpieszenie 100-200km/h (s)`}
              value={stage.acc_100_200}
              setValue={(v) => updateStage(index, "acc_100_200", Number(v))}
            />

            <AMPInput
              type="number"
              placeholder="50–150 km/h"
              name={`Przyśpieszenie 50-150km/h (s)`}
              value={stage.acc_50_150}
              setValue={(v) => updateStage(index, "acc_50_150", Number(v))}
            />

            <AMPInput
              type="number"
              placeholder="150–50 km/h"
              name={`Hamowanie 150-50km/h (s)`}
              value={stage.sl_150_50}
              setValue={(v) => updateStage(index, "sl_150_50", Number(v))}
            />

            <AMPInput
              type="number"
              placeholder="100–0 km/h"
              name={`Hamowanie 100-0km/h (s)`}
              value={stage.sl_100_0}
              setValue={(v) => updateStage(index, "sl_100_0", Number(v))}
            />
            {index !== 0 && (
              <AMPInput
                type="number"
                placeholder="Cena stage (zł)"
                name={`Cena`}
                value={stage.stagePrice}
                setValue={(v) => updateStage(index, "stagePrice", Number(v))}
              />
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            {index !== 0 && (
              <AMPButton
                type="none"
                name="Usuń stage"
                additionalTailwindCss="justify-center border border-amp-300/70 w-full"
                onClick={() => removeStage(index)}
              />
            )}

            <AMPButton
              type="secondary"
              name="Dodaj kolejny stage"
              additionalTailwindCss={`justify-center w-full ${
                index === 0 ? "col-span-2" : ""
              }`}
              onClick={addStage}
            />
          </div>

          <AMPSeparator />
        </div>
      ))}
    </div>
  );
};
