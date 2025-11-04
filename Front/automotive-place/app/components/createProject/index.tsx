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
import { AMPButton } from "../shared/AMPButton";
import { generateRandomProjectsToCreate } from "@/app/utils/data/project";
import { AMPStepper } from "../shared/Stepper/AMPSteper";
import { stepsOptions } from "./steps/config";
import { createProjectSchema } from "@/app/api/zod.schmas";
import { setShowCreatePost } from "@/lib/features/actions/actionsSlice";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { useDispatch } from "react-redux";
import { CreateNotification } from "../logger/NotificationHelper";
import { ErrorStatus } from "@/app/utils/enums";

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
  const dispatch = useDispatch();
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

  const onSubmit = async () => {
    const project = generateRandomProjectsToCreate(1, true, true, true)[0];

    // const newProject: TProjectCreate = {
    //   authorId: "",
    //   description: description.value.toString(),
    //   name: nameElement.value.toString(),
    //   forSell,
    //   inUse,
    //   carMake,
    //   carModel,
    //   isVisible,
    //   engineName: engine.engineName,
    //   engineStockHp: engine.engineStockHp,
    //   engineStockNm: engine.engineStockNm,
    //   engineDescription: engine.engineDescription,
    //   engineCapacity: engine.engineCapacity,
    //   transmissionGears: transmission.transmissionGears,
    //   transmissionDescription: transmission.transmissionDescription,
    //   transmissionName: transmission.transmissionName,
    //   transmissionWasSwapped: transmission.transmissionWasSwapped,

    //   carItemsCount: carItems.length,
    //   imagesCount: images.length,
    //   engineWasSwapped,
    //   carItems,
    //   stages,
    //   tags,

    //   garageId: "",
    //   projectPrice: 0,
    // };

    console.log(project);
    const result = validProject(project);
    const zodResult = createProjectSchema.safeParse(project);

    console.log(zodResult.error?.errors);
    const findInValidResult = result.validResults.find(
      (result) => result.valid == false
    );

    if (!findInValidResult && zodResult.success) {
      try {
        const res = await createProject(project);

        if (res?.notification) {
          dispatch(addNotification(JSON.stringify(res.notification)));
          dispatch(setShowCreatePost(false));
        }
      } catch (error: any) {
        dispatch(
          addNotification(
            JSON.stringify(
              CreateNotification(
                ErrorStatus.High,
                error.message || "Unknown error occurred"
              )
            )
          )
        );
      }
    }
  };

  const handleCarItemVallue = (value: string | number) => {
    const _carItemType: any = value;
    setCarItemType(_carItemType);
  };

  return (
    <main
      className="flex text-sm relative top-0 flex-col-reverse md:flex-row w-[95vw] max-md:w-[100vw] max-md:h-dvh h-[11/12] p-3 mr-0 rounded-sm border-r border-zinc-700"
      onClick={(e) => e.stopPropagation()}
    >
      <AMPStepper stepsOptions={stepsOptions} hideHeader onSubmit={onSubmit} />

      {/* <div className="ml-2">
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
        className="rounded-md p-2 pr-4 pl-4 flex flex-col max-w-lg group w-[300px] max-md:w-[100%]"
        noValidate
        action={onSubmit}
      >
        <AMPInput
          name="Nazwa projektu"
          setValue={(text) =>
            setNameElement({
              value: text,
              errorText: validCarNameValue(text)[0].error,
            })
          }
          value={nameElement.value}
          placeholder="Np. JDM GTR"
          inputStyles={{ fontSize: 12 }}
        />
        <AMPTextarea
          name="Opis projekty"
          setValue={(text) => setDescription({ value: text, errorText: "" })}
          value={description.value}
          placeholder="Np. Seryjna turbina, bez modyfikacji, orginalnie była w audi A3 8p "
          inputStyles={{ fontSize: 12, height: "150px" }}
        />

        <AMPButton
          name="Dodaj projekt"
          type="primary"
          additionalTailwindCss="justify-center"
          isSubmit
        />

        <AMPHelpFooter footerText="Czym jest projekt?" />
      </form> */}
    </main>
  );
};
