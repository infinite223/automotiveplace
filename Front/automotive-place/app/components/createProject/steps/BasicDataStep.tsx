import React, { useEffect, useState } from "react";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { AMPInput } from "../../shared/AMPInput";
import { BasicDataStep as BasicDataType } from "../types";
import { basicDataSchema } from "@/app/api/zod.schmas";
import { ZodIssue } from "zod";

interface BasicDataStepProps {
  onPrev: () => void;
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
  initialData?: any;
}

export const BasicDataStep: React.FC<BasicDataStepProps> = ({
  setIsValid,
  registerGetData,
  initialData,
}) => {
  const [data, setData] = useState<BasicDataType>({
    carMake: "",
    carModel: "",
    ...initialData,
  });
  const [errors, setErrors] = useState<null | ZodIssue[]>(null);

  const update = (field: keyof BasicDataType, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const result = basicDataSchema.safeParse(data);
    setIsValid(result.success);

    if (!result.success) setErrors(result.error.errors);
    else setErrors(null);
  }, [data]);

  useEffect(() => {
    registerGetData?.(() => ({
      ...data,
      name: data.name?.trim() ? data.name : undefined,
      description: data.description?.trim() ? data.description : undefined,
    }));
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 w-full">
        <div className="flex-1">
          <AMPInput
            required
            type="text"
            placeholder="Marka (np. Audi)"
            value={data.carMake}
            setValue={(v) => update("carMake", v.toString())}
            name="Marka"
            error={errors?.find((e) => e.path.includes("carMake"))?.message}
          />
        </div>

        <div className="flex-1">
          <AMPInput
            type="text"
            required
            placeholder="Model (np. A3 8P)"
            value={data.carModel}
            setValue={(v) => update("carModel", v.toString())}
            name="Model"
            error={errors?.find((e) => e.path.includes("carModel"))?.message}
          />
        </div>
      </div>

      <AMPInput
        type="text"
        placeholder="Nazwa projektu"
        value={data.name || ""}
        setValue={(v) => update("name", v || undefined)}
        name="Nazwa"
        error={errors?.find((e) => e.path.includes("name"))?.message}
      />

      <AMPTextarea
        name="Opis projektu"
        value={data.description || ""}
        placeholder="Np. Seryjna turbina, bez modyfikacji..."
        setValue={(v) => update("description", v || undefined)}
        inputStyles={{ fontSize: 12, height: "150px" }}
        error={errors?.find((e) => e.path.includes("description"))?.message}
      />
    </div>
  );
};
