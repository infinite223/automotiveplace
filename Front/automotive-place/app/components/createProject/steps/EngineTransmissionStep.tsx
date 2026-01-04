import React, { useEffect, useState } from "react";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { basicEngineAndTransmissionSchema } from "@/app/api/zod.schmas";
import { EngineTransmissionStepType } from "@/app/utils/types/project";
import { ZodIssue } from "zod";
import { AMPHelpFooter } from "../../shared/AMPHelpFooter";

interface EngineTransmissionStepProps {
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
  initialData?: any;
}

export const EngineTransmissionStep = ({
  setIsValid,
  registerGetData,
  initialData,
}: EngineTransmissionStepProps) => {
  const [data, setData] = useState<EngineTransmissionStepType>({
    engineName: "",
    engineCapacity: "",
    engineDescription: "",
    engineWasSwapped: false,

    transmissionType: "", // automat = 1, manual = 2?
    transmissionGears: "",
    transmissionWasSwapped: false,
    ...initialData,
  });
  const [errors, setErrors] = useState<null | ZodIssue[]>(null);

  const update = (field: keyof EngineTransmissionStepType, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const result = basicEngineAndTransmissionSchema.safeParse(data);
    setIsValid(result.success);

    if (!result.success) setErrors(result.error.errors);
    else setErrors(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    registerGetData?.(() => ({
      ...data,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold mb-2">Silnik</h3>

      <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <AMPInput
            required
            type="text"
            placeholder="Nazwa silnika (np. B58)"
            name="Nazwa silnika"
            value={data.engineName}
            setValue={(v) => update("engineName", v.toString())}
            error={errors?.find((e) => e.path.includes("engineName"))?.message}
          />
        </div>
        <div className="w-1/2">
          <AMPInput
            required
            type="number"
            placeholder="Pojemność (np. 2.0)"
            name="Pojemność silnika"
            value={data.engineCapacity}
            setValue={(v) => update("engineCapacity", Number(v))}
            error={
              errors?.find((e) => e.path.includes("engineCapacity"))?.message
            }
          />
        </div>
      </div>

      <AMPTextarea
        required
        name="Opis silnika"
        placeholder="Np. seria, brak modyfikacji"
        value={data.engineDescription || ""}
        setValue={(v) => update("engineDescription", v)}
        error={
          errors?.find((e) => e.path.includes("engineDescription"))?.message
        }
      />

      <AMPHelpFooter footerText="Szczegółowe paramerty silnika będzie można podać w kolejnym kroku" />
      <h3 className="text-lg font-semibold mt-4 mb-2">Skrzynia biegów</h3>

      <AMPInput
        type="text"
        placeholder="Nazwa skrzyni (np. ZF8hp)"
        name="Skrzynia"
        value={data.transmissionName}
        setValue={(v) => update("transmissionName", v.toString())}
        error={
          errors?.find((e) => e.path.includes("transmissionName"))?.message
        }
      />

      <AMPTextarea
        name="Opis skrzyni"
        placeholder="Opis skrzyni biegów"
        value={data.transmissionDescription || ""}
        setValue={(v) => update("transmissionDescription", v)}
        error={
          errors?.find((e) => e.path.includes("transmissionDescription"))
            ?.message
        }
      />

      <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <AMPInput
            required
            type="number"
            placeholder="Ilość biegów"
            name="Biegi"
            value={data.transmissionGears}
            setValue={(v) => update("transmissionGears", Number(v))}
            error={
              errors?.find((e) => e.path.includes("transmissionGears"))?.message
            }
          />
        </div>
        <div className="w-1/2">
          <AMPInput
            required
            type="number"
            placeholder="Typ (1-auto, 2-manual)"
            name="Typ"
            value={data.transmissionType}
            setValue={(v) => update("transmissionType", Number(v))}
            error={
              errors?.find((e) => e.path.includes("transmissionType"))?.message
            }
          />
        </div>
      </div>
    </div>
  );
};
