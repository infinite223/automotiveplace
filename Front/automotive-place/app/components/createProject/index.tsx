import React from "react";
import { validProject } from "./Validation";
import { createProject, uploadImageProject } from "@/app/services/project";
import { AMPStepper } from "../shared/Stepper/AMPSteper";
import { stepsOptions } from "./steps/config";
import { createProjectSchema } from "@/app/api/zod.schmas";
import { setShowCreateProject } from "@/lib/features/actions/actionsSlice";
import { addNotification } from "@/lib/features/notifications/notificationsSlice";
import { useDispatch } from "react-redux";
import { CreateNotification } from "../logger/NotificationHelper";
import { mergeProjectWithMedia, stepperDataToCreateProject } from "./helpers";
import { Status } from "@/app/utils/enums";
import {
  setIsLoading,
  setLoadingText,
} from "@/lib/features/loading/globalLoadingSlice";
import { TStepStageCreate } from "@/app/utils/types/stage";
import { InfiniteData, useQueryClient } from "@tanstack/react-query";
import { addProjectToInfiniteQuery } from "@/app/hooks/useInfiniteContent";
import { MainContentResponse } from "@/app/hooks/useMainContent";

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
  const queryClient = useQueryClient();

  const onSubmit = async (data: any) => {
    console.log(data, "data");
    dispatch(setIsLoading(true));
    dispatch(setLoadingText("Przygotowywanie danych..."));

    try {
      const project = stepperDataToCreateProject(data);

      dispatch(setLoadingText("Sprawdzanie danych..."));

      const customValidation = validProject(project);
      const zodResult = createProjectSchema.safeParse(project);

      const invalid = customValidation.validResults.find(
        (r) => r.valid === false,
      );

      if (invalid || !zodResult.success) {
        dispatch(
          addNotification(
            JSON.stringify(
              CreateNotification(
                Status.Medium,
                invalid?.error ??
                  zodResult.error?.errors[0]?.message ??
                  "Dane formularza są niepoprawne",
              ),
            ),
          ),
        );

        return;
      }

      dispatch(setLoadingText("Dodawanie projektu..."));
      const res = await createProject(project);
      let createdProject = res.project;

      const projectId = res.project.id;
      const images: File[] = data[2]?.data?.images ?? [];

      if (images.length) {
        dispatch(setLoadingText("Dodawanie zdjęć..."));

        const formData = new FormData();
        images.forEach((file) => formData.append("files", file));

        const uploadRes = await uploadImageProject(projectId, formData);

        if (uploadRes?.success) {
          createdProject = mergeProjectWithMedia(
            createdProject,
            uploadRes.files,
          );
        }
      }

      const stages = project.stages ?? [];
      const stepStages = data[3]?.data as TStepStageCreate[];

      for (let i = 0; i < stages.length; i++) {
        const stageFile = stepStages?.[i]?.chartImage;
        if (!stageFile) continue;

        dispatch(
          setLoadingText(`Dodawanie wykresu – Stage ${stages[i].stageNumber}`),
        );

        const formData = new FormData();
        formData.append("files", stageFile);

        await uploadImageProject(projectId, formData, stages[i].stageNumber);
      }

      if (res?.notification) {
        queryClient.setQueryData(
          ["projects"],
          (oldData: InfiniteData<MainContentResponse> | undefined) =>
            addProjectToInfiniteQuery(oldData, createdProject),
        );

        dispatch(addNotification(JSON.stringify(res.notification)));
        dispatch(setShowCreateProject(false));
      }
    } catch (error: any) {
      dispatch(
        addNotification(
          JSON.stringify(
            CreateNotification(
              Status.High,
              error?.message || "Wystąpił nieoczekiwany błąd",
            ),
          ),
        ),
      );
    } finally {
      dispatch(setIsLoading(false));
      dispatch(setLoadingText(""));
    }
  };

  return (
    <main
      className="flex text-sm relative top-0 flex-col-reverse md:flex-row w-[95vw] max-md:px-5 max-md:w-[100vw] max-md:h-dvh h-[11/12] p-3 max-md:pt-0 mr-0 rounded-sm border-r border-zinc-700"
      onClick={(e) => e.stopPropagation()}
    >
      <AMPStepper stepsOptions={stepsOptions} hideHeader onSubmit={onSubmit} />
    </main>
  );
};
