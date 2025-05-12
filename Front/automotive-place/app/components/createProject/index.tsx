import React, { useState } from "react";
import { AMPInput } from "./../shared/AMPInput";
import { validCarNameValue, validProject } from "./Validation";
import { AMPTextarea } from "../shared/AMPTextarea";
import { AMPSwitch } from "../shared/AMPSwitch";
import { createProject } from "@/app/services/project";
import { AMPHelpFooter } from "../shared/AMPHelpFooter";
import { ItemTypes, TCarItemCreate } from "@/app/utils/types/carItem";
import { TProjectCreate } from "@/app/utils/types/project";
import { TStageCreate } from "@/app/utils/types/stage";
import { TTagCreate } from "@/app/utils/types/tag";

interface IInputValue {
  value: string | number;
  errorText: string | null;
}

export type TEngineData = {
  engineName: string;
  engineStockHp: number;
  engineStockNm: number;
  engineDescription?: string;
  engineCapacity: number;
};

export type TTransmissionData = {
  transmissionGears: number;
  transmissionName: string;
  transmissionWasSwapped: boolean;
  transmissionDescription?: string;
};

export const CreateProjectView = () => {
  const [nameElement, setNameElement] = useState<IInputValue>({
    value: "",
    errorText: null,
  });
  const [carItemType, setCarItemType] = useState<ItemTypes>(ItemTypes.Turbo);
  const [forSell, setForSell] = useState(false);
  const [inUse, setInUse] = useState(false);
  const [engineWasSwapped, setEngineWasSwapped] = useState(false);
  const [carModel, setCarModel] = useState("");
  const [carMake, setCarMake] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const [itemType, setItemType] = useState<ItemTypes>(ItemTypes.Brakes);
  const [description, setDescription] = useState<IInputValue>({
    value: "",
    errorText: null,
  });

  const [engine, setEngine] = useState<TEngineData>({
    engineName: "",
    engineStockHp: 0,
    engineStockNm: 0,
    engineDescription: "",
    engineCapacity: 2,
  });
  const [transmission, setTransmission] = useState<TTransmissionData>({
    transmissionName: "",
    transmissionDescription: "",
    transmissionGears: 0,
    transmissionWasSwapped: false,
  });

  const [carItems, setCarItems] = useState<TCarItemCreate[]>([]);
  const [stages, setStages] = useState<TStageCreate[]>([]);
  const [tags, setTags] = useState<TTagCreate[]>([]);

  const [images, setImages] = useState<TCarItemCreate[]>([]);

  const onSubmit = () => {
    const newProject: TProjectCreate = {
      authorId: "",
      description: description.value.toString(),
      name: nameElement.value.toString(),
      forSell,
      inUse,
      carMake,
      carModel,
      isVisible,
      engineName: engine.engineName,
      engineStockHp: engine.engineStockHp,
      engineStockNm: engine.engineStockNm,
      engineDescription: engine.engineDescription,
      engineCapacity: engine.engineCapacity,
      transmissionGears: transmission.transmissionGears,
      transmissionDescription: transmission.transmissionDescription,
      transmissionName: transmission.transmissionName,
      transmissionWasSwapped: transmission.transmissionWasSwapped,

      carItemsCount: carItems.length,
      imagesCount: images.length,
      engineWasSwapped,
      carItems,
      stages,
      tags,

      garageId: "",
      projectPrice: 0,
    };

    const result = validProject(newProject);
    const findInValidResult = result.validResults.find(
      (result) => result.valid == false
    );

    if (!findInValidResult) {
      const result = createProject(newProject);
      console.log(result);
    } else {
      result.validResults.map((res) => {
        throw new Error(res.error);
      });
    }
  };

  const handleCarItemVallue = (value: string | number) => {
    const _carItemType: any = value;
    setCarItemType(_carItemType);
  };

  return (
    <main
      className="flex justify-center text-sm rounded-md flex-col-reverse md:flex-row"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="w-[95vw] md:w-[760px] max-w-lg h-[11/12] p-3 mr-0 rounded-sm border-r border-zinc-700 ml-2">
        <div className="flex flex-col gap-2 mt-3">
          <AMPSwitch
            name="Element w użyciu?"
            setValue={setInUse}
            value={inUse}
          />
          <AMPSwitch
            name="Element na sprzedaż?"
            setValue={setForSell}
            value={forSell}
          />

          <p className="leading-3 text-[11px] mt-2">
            Po utworzeniu projektu można go edytować.
          </p>
        </div>
      </div>
      <form
        className="rounded-md p-2 pr-4 pl-4 flex flex-col max-w-lg group w-[300px]"
        noValidate
        action={onSubmit}
      >
        <AMPInput
          name="Nazwa elementu"
          setValue={(text) =>
            setNameElement({
              value: text,
              errorText: validCarNameValue(text)[0].error,
            })
          }
          value={nameElement.value}
          placeholder="Np. Turbina K03s"
          inputStyles={{ fontSize: 12 }}
        />
        <AMPTextarea
          name="Opis elementu"
          setValue={(text) => setDescription({ value: text, errorText: "" })}
          value={description.value}
          placeholder="Np. Seryjna turbina, bez modyfikacji, orginalnie była w audi A3 8p "
          inputStyles={{ fontSize: 12, height: "150px" }}
        />
        <button
          type="submit"
          className="mt-4 bg-teal-800 py-2 rounded-md text-white group-invalid:pointer-events-none group-invalid:opacity-50"
        >
          Dodaj projekt
        </button>

        <AMPHelpFooter footerText="Czym jest projekt?" />
      </form>
    </main>
  );
};
