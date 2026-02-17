import React from "react";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPButton } from "../../shared/AMPButton";
import { AMPSeparator } from "../../shared/AMPSeparator";
import { TStepHistoryCreate } from "@/app/utils/types/history";
import { AMPSwitch } from "../../shared/AMPSwitch";
import { createHistoryStepSchema } from "@/app/api/zod.schmas";

interface HistoryFormProps {
  item: TStepHistoryCreate;
  index: number;
  onChange: (field: keyof TStepHistoryCreate, value: string | boolean) => void;
  onRemove: () => void;
  onAdd: () => void;
  isLast: boolean;
  isSingleMode?: boolean;
  editMode?: boolean;
}

export const HistoryForm: React.FC<HistoryFormProps> = ({
  item,
  index,
  onChange,
  onRemove,
  onAdd,
  isLast,
  isSingleMode = false,
  editMode = false,
}) => {
  const isValid = createHistoryStepSchema.safeParse(item).success;

  return (
    <div className="pt-4 flex flex-col gap-2">
      <div className="flex gap-4">
        <div className="w-2/3">
          <AMPInput
            required
            name="Tytuł wpisu"
            placeholder="np. Serwis olejowy"
            value={item.title}
            setValue={(v) => onChange("title", v.toString())}
          />
        </div>
        <div className="w-1/3">
          <AMPInput
            type="date"
            name="Data"
            value={item.date.toString() || ""}
            setValue={(v) => onChange("date", v.toString())}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <AMPInput
            required
            type="number"
            name="Przebieg (km)"
            placeholder="120 000"
            value={item.mileage}
            setValue={(v) => onChange("mileage", v.toString())}
          />
        </div>

        <div className="flex-1">
          <AMPInput
            type="number"
            name="Cena (zł)"
            placeholder="0.00"
            value={item.price ?? ""}
            setValue={(v) => onChange("price", v.toString())}
          />
        </div>
      </div>

      <AMPTextarea
        name="Opis"
        placeholder="Co dokładnie zostało zrobione?"
        value={item.description ?? ""}
        setValue={(v) => onChange("description", v.toString())}
      />

      <div className="w-fit">
        <AMPSwitch
          name="Czy chcesz aby ten wpis był widoczny dla wszystkich?"
          value={item.isVisible}
          additionalTailwindCss="ml-1"
          setValue={(v) => onChange("isVisible", v)}
        />
      </div>
      <div className="flex gap-2 mt-2">
        {isSingleMode ? (
          <AMPButton
            type="secondary"
            name={editMode ? "Edytuj wpis" : "Dodaj wpis"}
            onClick={onAdd}
            disabled={!isValid}
            additionalTailwindCss={`w-full justify-center text-sm font-bold mt-4 ${
              !isValid ? "opacity-50 cursor-not-allowed" : ""
            }`}
          />
        ) : (
          <>
            <AMPButton
              type="none"
              name="Usuń wpis"
              onClick={onRemove}
              additionalTailwindCss="border border-amp-300/70 justify-center w-full text-xs"
            />
            {isLast && (
              <AMPButton
                type="secondary"
                name="Dodaj kolejny"
                onClick={onAdd}
                disabled={!isValid}
                additionalTailwindCss={`w-full justify-center text-xs ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              />
            )}
          </>
        )}
      </div>
      {!isSingleMode && <AMPSeparator />}
    </div>
  );
};
