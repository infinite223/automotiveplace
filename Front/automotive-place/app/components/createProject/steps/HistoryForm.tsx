import React from "react";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPButton } from "../../shared/AMPButton";
import { AMPSeparator } from "../../shared/AMPSeparator";
import { TStepHistoryCreate } from "@/app/utils/types/history";

interface HistoryFormProps {
  item: TStepHistoryCreate;
  index: number;
  onChange: (field: keyof TStepHistoryCreate, value: string) => void;
  onRemove: () => void;
  onAdd: () => void;
  isLast: boolean;
}

export const HistoryForm: React.FC<HistoryFormProps> = ({
  item,
  index,
  onChange,
  onRemove,
  onAdd,
  isLast,
}) => {
  return (
    <div className="pt-4 border-t border-amp-700/50 flex flex-col gap-2">
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
            value={item.date}
            setValue={(v) => onChange("date", v.toString())}
          />
        </div>
      </div>

      <div className="flex gap-4">
        <AMPInput
          required
          type="number"
          name="Przebieg (km)"
          placeholder="120 000"
          value={item.mileage}
          setValue={(v) => onChange("mileage", v.toString())}
        />
        <AMPInput
          type="number"
          name="Cena (zł)"
          placeholder="0.00"
          value={item.price}
          setValue={(v) => onChange("price", v.toString())}
        />
      </div>

      <AMPTextarea
        name="Opis"
        placeholder="Co dokładnie zostało zrobione?"
        value={item.description}
        setValue={(v) => onChange("description", v.toString())}
      />

      <div className="flex gap-2 mt-2">
        <AMPButton
          type="none"
          name="Usuń wpis"
          onClick={onRemove}
          additionalTailwindCss="border border-amp-300/70 w-full text-xs"
        />
        {isLast && (
          <AMPButton
            type="secondary"
            name="Dodaj kolejny"
            onClick={onAdd}
            additionalTailwindCss="w-full text-xs"
          />
        )}
      </div>
      <AMPSeparator />
    </div>
  );
};
