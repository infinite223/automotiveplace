import { TProjectCreate } from "@/app/utils/types/project";
import { TStageCreate } from "@/app/utils/types/stage";
import { ZodIssue } from "zod";

export type BasicDataStep = Pick<
  TProjectCreate,
  "name" | "carModel" | "carMake" | "description"
>;

export interface StepProps {
  onPrev: () => void;
  setIsValid: (isValid: boolean) => void;
  registerGetData?: (fn: () => unknown) => void;
  initialData?: any;
}

export interface StageFormProps {
  stage: TStageCreate;
  index: number;
  errors?: ZodIssue[];
  onChange: <K extends keyof TStageCreate>(
    field: K,
    value: TStageCreate[K]
  ) => void;
  onRemove: () => void;
  onAdd: () => void;
}
