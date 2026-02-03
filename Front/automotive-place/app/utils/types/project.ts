import { TCarItem, TCarItemCreate } from "./carItem";
import { TBasicHistory, THistoryCreate } from "./history";
import { TStageCreate, TStage } from "./stage";
import { TBasicTag, TTagCreate } from "./tag";
import { TBasicUser } from "./user";

type TProject = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name?: string;
  carMake: string;
  description?: string;

  forSell: boolean;
  isVisible: boolean;

  carModel: string;
  isVerified: boolean;

  imagesUrl: string;
  imagesCount: number;
  carItemsCount: number;
  garageId: string;
  userId: string;
  images?: string[];
  authorId: string;
  author?: TBasicUser;

  engineName: string;
  engineStockHp: number;
  engineStockNm: number;
  engineDescription?: string;
  engineWasSwapped?: boolean;
  engineCapacity: number;

  transmissionName?: string;
  transmissionGears: number;
  transmissionDescription?: string;
  transmissionWasSwapped?: boolean;
  transmissionType: number; // type -> 0 - maual | 1 - automat -> TransmissionType enum
  projectPrice?: number;
  weightStock?: number;
  topSpeedStock?: number;

  carItems?: TCarItem[];
  stages?: TStage[];
  tags?: TBasicTag[];
  history?: TBasicHistory[];

  location?: TLocation;
  isLikedByAuthUser: boolean;
  likesCount: number;
};

type TBasicProject = Pick<
  TProject,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "forSell"
  | "isVisible"
  | "name"
  | "carMake"
  | "carModel"
  | "description"
  | "isVerified"
  | "engineStockHp"
  | "engineStockNm"
  | "isLikedByAuthUser"
  | "likesCount"
> & {
  hp: number;
  nm: number;
  acc_0_100: number | null;
  acc_100_200: number | null;
  stageNumber: number;

  engineNameAndCapacity: string;
  images: string[];
  tags: TBasicTag[];
  author: TBasicUser;
};

type TProjectCreate = Pick<
  TProject,
  | "forSell"
  | "name"
  | "carMake"
  | "carModel"
  | "description"
  | "isVisible"
  | "engineName"
  | "engineStockHp"
  | "engineStockNm"
  | "engineDescription"
  | "engineCapacity"
  | "engineWasSwapped"
  | "transmissionName"
  | "transmissionGears"
  | "transmissionDescription"
  | "transmissionWasSwapped"
  | "transmissionType"
> & {
  projectPrice: number;
  imagesCount: number;
  carItemsCount: number;

  stages?: TStageCreate[];
  carItems?: TCarItemCreate[];
  tags?: TTagCreate[];
  history?: THistoryCreate[];
};

type TEngine = Pick<
  TProject,
  | "engineName"
  | "engineStockHp"
  | "engineStockNm"
  | "engineCapacity"
  | "engineDescription"
  | "engineWasSwapped"
>;

type TTransmission = Pick<
  TProject,
  | "transmissionName"
  | "transmissionGears"
  | "transmissionDescription"
  | "transmissionWasSwapped"
  | "transmissionType"
>;

function isTBasicProject(data: any): data is TBasicProject {
  return (
    (typeof data === "object" &&
      data !== null &&
      typeof data.id === "string" &&
      typeof data.forSell === "boolean" &&
      typeof data.isVisible === "boolean" &&
      typeof data.carMake === "string" &&
      typeof data.carModel === "string" &&
      typeof data.likesCount === "number" &&
      typeof data.engineNameAndCapacity === "string" &&
      typeof data.isLikedByAuthUser === "boolean" &&
      typeof data.hp === "number" &&
      typeof data.nm === "number" &&
      typeof data.engineStockHp === "number" &&
      typeof data.stageNumber === "number" &&
      typeof data.engineStockNm === "number") ||
    (Array.isArray(data.images) && data.images > 0)
  );
}

export type TLocation = {
  name: string;
  description: string;
  lat: number;
  lng: number;
};

export type EngineTransmissionStepType = Pick<
  TProjectCreate,
  | "engineName"
  | "engineStockHp"
  | "engineStockNm"
  | "engineDescription"
  | "engineCapacity"
  | "engineWasSwapped"
  | "transmissionName"
  | "transmissionGears"
  | "transmissionDescription"
  | "transmissionWasSwapped"
  | "transmissionType"
>;

type TBasicPopularProject = {
  id: string;
  carMake: string;
  carModel: string;
  stageNumber: number;
  stageName: string;
  currentHp: number;
  currentNm: number;
  author: TBasicUser;
  likesCount: number;
  images: string[];
};

export type { TProject, TBasicProject, TProjectCreate, TBasicPopularProject };
export { isTBasicProject };
