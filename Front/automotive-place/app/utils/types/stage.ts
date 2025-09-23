import { TCarItem } from "./carItem";

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
  carItems?: TCarItem[];
};

type TStageCreate = {
  name: string;
  description: string;
  stageNumber: number;

  hp: number;
  nm: number;
  acc_0_100: number;
  acc_100_200: number;
  acc_50_150: number;

  sl_150_50: number;
  sl_100_0: number;

  stagePrice: number;
  //   chartImageUrl?: string;???
  carItems?: TCarItem[];
  createdById?: string;
};

export type { TStageCreate, TStage };
