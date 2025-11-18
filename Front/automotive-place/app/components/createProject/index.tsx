import React from "react";
import { validProject } from "./Validation";
import { createProject } from "@/app/services/project";
import { AMPStepper } from "../shared/Stepper/AMPSteper";
import { stepsOptions } from "./steps/config";
import { createProjectSchema } from "@/app/api/zod.schmas";
import { setShowCreatePost } from "@/lib/features/actions/actionsSlice";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { useDispatch } from "react-redux";
import { CreateNotification } from "../logger/NotificationHelper";
import { stepperDataToCreateProject } from "./helpers";
import { Status } from "@/app/utils/enums";

export interface IInputValue {
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
  const dispatch = useDispatch();

  const onSubmit = async (data: any) => {
    const project = stepperDataToCreateProject(data);
    console.log(project);
    // const project = generateRandomProjectsToCreate(1, true, true, true)[0];

    console.log(project);
    const result = validProject(project);
    const zodResult = createProjectSchema.safeParse(project);

    const findInValidResult = result.validResults.find(
      (result) => result.valid == false
    );

    console.log(zodResult.error?.errors, zodResult.success, findInValidResult);
    if (!findInValidResult && zodResult.success) {
      try {
        console.log("test");
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
                Status.High,
                error.message || "Unknown error occurred"
              )
            )
          )
        );
      }
    }
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
