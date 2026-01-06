import React from "react";
import { ZodIssue } from "zod";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPButton } from "../../shared/AMPButton";
import { AMPSeparator } from "../../shared/AMPSeparator";
import { TStageCreate, TStepStageCreate } from "@/app/utils/types/stage";
import { numberOrUndefined } from "../helpers";
import { StageFormProps } from "../types";
import { StageChartImageUpload } from "./StageChartImageUpload";

export const StageForm: React.FC<StageFormProps> = ({
  stage,
  index,
  errors = [],
  onChange,
  onRemove,
  onAdd,
}) => {
  const error = (field: keyof TStepStageCreate) =>
    errors.find((e) => e.path[0] === field)?.message;

  return (
    <div className="pt-4 border-t border-amp-700/50 flex flex-col gap-2">
      {index === 0 && (
        <div className="text-sm font-semibold mb-2">
          Stage 0 to dane bazowe pojazdu (przed modyfikacjami)
        </div>
      )}

      <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <AMPInput
            required
            type="text"
            placeholder="Nazwa etapu np. modyfikacja sterownika"
            name="Nazwa etapu"
            value={stage.name ?? ""}
            setValue={(v) => onChange("name", v.toString())}
            error={error("name")}
          />
        </div>

        <div className="w-1/2">
          <AMPInput
            type="number"
            required
            placeholder="Numer etapu"
            name="Numer etapu"
            value={stage.stageNumber}
            setValue={(v) => onChange("stageNumber", Number(v))}
            error={error("stageNumber")}
          />
        </div>
      </div>

      <AMPTextarea
        required
        name="Opis etapu"
        placeholder="Możesz tutaj opisać co zostało zmodyfikowane..."
        value={stage.description}
        setValue={(v) => onChange("description", v.toString())}
        error={error("description")}
      />

      <div className="grid grid-cols-4 max-md:grid-cols-2 gap-4 w-full">
        <AMPInput
          required
          type="number"
          placeholder="HP"
          name="Moc silnika"
          value={stage.hp}
          setValue={(v) => onChange("hp", Number(v))}
          error={error("hp")}
        />

        <AMPInput
          required
          type="number"
          placeholder="Nm"
          name="Moment obrotowy"
          value={stage.nm}
          setValue={(v) => onChange("nm", Number(v))}
          error={error("nm")}
        />

        <AMPInput
          type="number"
          placeholder="0–100 km/h"
          name="Przyśpieszenie 0–100 km/h (s)"
          value={stage.acc_0_100 ?? ""}
          setValue={(v) => onChange("acc_0_100", numberOrUndefined(v))}
          error={error("acc_0_100")}
        />

        <AMPInput
          type="number"
          placeholder="100–200 km/h"
          name="Przyśpieszenie 100–200 km/h (s)"
          value={stage.acc_100_200 ?? ""}
          setValue={(v) => onChange("acc_100_200", numberOrUndefined(v))}
          error={error("acc_100_200")}
        />

        <AMPInput
          type="number"
          placeholder="50–150 km/h"
          name="Przyśpieszenie 50–150 km/h (s)"
          value={stage.acc_50_150 ?? ""}
          setValue={(v) => onChange("acc_50_150", numberOrUndefined(v))}
          error={error("acc_50_150")}
        />

        <AMPInput
          type="number"
          placeholder="150–50 km/h"
          name="Hamowanie 150–50 km/h (s)"
          value={stage.sl_150_50 ?? ""}
          setValue={(v) => onChange("sl_150_50", numberOrUndefined(v))}
          error={error("sl_150_50")}
        />

        <AMPInput
          type="number"
          placeholder="100–0 km/h"
          name="Hamowanie 100–0 km/h (s)"
          value={stage.sl_100_0 ?? ""}
          setValue={(v) => onChange("sl_100_0", numberOrUndefined(v))}
          error={error("sl_100_0")}
        />

        {index !== 0 && (
          <AMPInput
            type="number"
            placeholder="Cena stage (zł)"
            name="Cena stage"
            value={stage.stagePrice ?? ""}
            setValue={(v) => onChange("stagePrice", numberOrUndefined(v))}
            error={error("stagePrice")}
          />
        )}
      </div>

      <StageChartImageUpload
        value={stage.chartImage}
        onChange={(file) => onChange("chartImage", file)}
      />

      <div className="grid grid-cols-2 gap-4 w-full">
        {index !== 0 && (
          <AMPButton
            type="none"
            name="Usuń stage"
            additionalTailwindCss="justify-center border border-amp-300/70 w-full text-xs"
            onClick={onRemove}
          />
        )}

        <AMPButton
          type="secondary"
          name="Dodaj kolejny stage"
          additionalTailwindCss={`justify-center w-full text-xs ${
            index === 0 ? "col-span-2" : ""
          }`}
          onClick={onAdd}
        />
      </div>

      <AMPSeparator />
    </div>
  );
};
