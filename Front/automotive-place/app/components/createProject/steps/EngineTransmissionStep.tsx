import React, { useEffect, useState } from "react";
import { AMPInput } from "../../shared/AMPInput";
import { AMPTextarea } from "../../shared/AMPTextarea";
import { basicEngineAndTransmissionSchema } from "@/app/api/zod.schmas";
import { EngineTransmissionStepType } from "@/app/utils/types/project";

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
    engineStockHp: "",
    engineStockNm: "",
    engineWasSwapped: false,

    transmissionName: "",
    transmissionDescription: "",
    transmissionType: "", // automat = 1, manual = 2?
    transmissionGears: "",
    transmissionWasSwapped: false,
    ...initialData,
  });

  const update = (field: keyof EngineTransmissionStepType, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const result = basicEngineAndTransmissionSchema.safeParse(data);
    setIsValid(result.success);
  }, [data]);

  useEffect(() => {
    registerGetData?.(() => ({
      ...data,
    }));
  }, [data]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Silnik</h3>

      <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <AMPInput
            required
            type="text"
            placeholder="Nazwa silnika (np. B58)"
            name="Nazwa silnika"
            value={data.engineName}
            setValue={(v) => update("engineName", v.toString())}
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
          />
        </div>
      </div>

      <AMPTextarea
        required
        name="Opis silnika"
        placeholder="Np. seria, brak modyfikacji"
        value={data.engineDescription || ""}
        setValue={(v) => update("engineDescription", v)}
      />

      <div className="flex gap-4 w-full">
        <div className="w-1/2">
          <AMPInput
            required
            type="number"
            placeholder="Moc seryjna (KM)"
            name="KM"
            value={data.engineStockHp}
            setValue={(v) => update("engineStockHp", Number(v))}
          />
        </div>
        <div className="w-1/2">
          <AMPInput
            required
            type="number"
            placeholder="Moment seryjny (Nm)"
            name="Nm"
            value={data.engineStockNm}
            setValue={(v) => update("engineStockNm", Number(v))}
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4">Skrzynia biegów</h3>

      <AMPInput
        required
        type="text"
        placeholder="Nazwa skrzyni (np. ZF8hp)"
        name="Skrzynia"
        value={data.transmissionName}
        setValue={(v) => update("transmissionName", v.toString())}
      />

      <AMPTextarea
        required
        name="Opis skrzyni"
        placeholder="Opis skrzyni biegów"
        value={data.transmissionDescription || ""}
        setValue={(v) => update("transmissionDescription", v)}
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
          />
        </div>
      </div>
    </div>
  );
};
