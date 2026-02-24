import React from "react";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPSelect } from "../../shared/AMPSelect";
import { AMPButton } from "../../shared/AMPButton";
import { AMPSeparator } from "../../shared/AMPSeparator";
import { TVisualModificationType } from "@/app/utils/types/visualModification";
import { TVisualModificationCreate } from "@/app/utils/types/visualModification";
import { FiLayout } from "react-icons/fi";

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
  const typeOptions = Object.values(TVisualModificationType).map((type) => ({
    label: type.replace(/_/g, " "),
    value: type,
  }));

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
