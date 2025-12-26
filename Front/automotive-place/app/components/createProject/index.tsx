import React from "react";
import { validProject } from "./Validation";
import { createProject } from "@/app/services/project";
import { AMPStepper } from "../shared/Stepper/AMPSteper";
import { stepsOptions } from "./steps/config";
import { createProjectSchema } from "@/app/api/zod.schmas";
import { setShowCreateProject } from "@/lib/features/actions/actionsSlice";
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

  // const onSubmit = async (data: any) => {
  //   const project = stepperDataToCreateProject(data);
  //   // const project = generateRandomProjectsToCreate(1, true, true, true)[0];

  //   const result = validProject(project);
  //   const zodResult = createProjectSchema.safeParse(project);

  //   const findInValidResult = result.validResults.find(
  //     (result) => result.valid == false
  //   );

  //   if (!findInValidResult && zodResult.success) {
  //     try {
  //       console.log(project, "proj");
  //       const res = await createProject(project);

  //       if (res?.notification) {
  //         dispatch(addNotification(JSON.stringify(res.notification)));
  //         dispatch(setShowCreateProject(false));
  //       }
  //     } catch (error: any) {
  //       dispatch(
  //         addNotification(
  //           JSON.stringify(
  //             CreateNotification(
  //               Status.High,
  //               error.message || "Unknown error occurred"
  //             )
  //           )
  //         )
  //       );
  //     }
  //   }
  // };

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    const imagesStepData: File[] = data[0].data.images || [];
    console.log(imagesStepData, "imagesStepData");
    const formData = new FormData();

    imagesStepData.forEach((file) => {
      formData.append("files", file);
    });

    const res = await fetch("/api/upload-images", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
  };

  return (
    <main
      className="flex text-sm relative top-0 flex-col-reverse md:flex-row w-[95vw] max-md:px-5 max-md:w-[100vw] max-md:h-dvh h-[11/12] p-3 mr-0 rounded-sm border-r border-zinc-700"
      onClick={(e) => e.stopPropagation()}
    >
      <AMPStepper stepsOptions={stepsOptions} hideHeader onSubmit={onSubmit} />
    </main>
  );
};
