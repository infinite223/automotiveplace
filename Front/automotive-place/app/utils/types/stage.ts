import { TCarItem, TCarItemBaseOnProject, TCarItemCreate } from "./carItem";

type TStage = {
  id: string;
  name: string;
  description?: string;
  stageNumber: number;
  createdAt: Date;
  updatedAt: Date;

  hp: number;
  nm: number;
  acc_0_100: number;
  acc_100_200: number;
  acc_50_150: number;

  sl_150_50?: number;
  sl_100_0?: number;
  maxRPM?: number;

  projectId: string;
  createdById: string;

  stagePrice?: number;
  chartImageUrl?: string;
  carItems?: TCarItemBaseOnProject[];
};

type TStageCreate = {
  name: string;
  description: string;
  stageNumber: number;

  hp: number;
  nm: number;
  acc_0_100?: number;
  acc_100_200?: number;
  acc_50_150?: number;

  sl_150_50?: number;
  sl_100_0?: number;

  stagePrice?: number;
  chartImageUrl?: string;
  carItems?: TCarItemCreate[];
  createdById?: string;
};

type TStepStageCreate = {
  name: string;
  description: string;

  stageNumber: string;
  hp: string;
  nm: string;

  acc_0_100?: string;
  acc_100_200?: string;
  acc_50_150?: string;
  sl_150_50?: string;
  sl_100_0?: string;

  stagePrice?: string;

  chartImage?: File | null;
  carItems?: TCarItemCreate[];
};

export type { TStageCreate, TStage, TStepStageCreate };
