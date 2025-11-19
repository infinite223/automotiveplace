import { TProjectCreate } from "@/app/utils/types/project";

export type BasicDataStep = Pick<
  TProjectCreate,
  "name" | "carModel" | "carMake" | "description"
>;
