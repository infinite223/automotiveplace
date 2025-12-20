import { TCarItem, TCarItemCreate } from "./carItem";
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

  transmissionName: string;
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

  // likes:
  // pickedProjectsOnEventOrSpot:
  // tags:
  // authorId:
  // companyId:
  location?: TLocation;
  isLikedByAuthUser: boolean;
  likesCount: number;
};

export type TLocation = {
  name: string;
  description: string;
  lat: number;
  lng: number;
};

type TBasicProject = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  forSell: boolean;
  isVisible: boolean;

  name?: string | null;
  carMake: string;
  carModel: string;
  description?: string | null;
  isVerified: boolean;

  hp: number;
  nm: number;
  engineStockHp: number;
  engineStockNm: number;
  acc_0_100: number | null;
  acc_100_200: number | null;
  stageNumber: number;

  engineNameAndCapacity: string;
  isLikedByAuthUser: boolean;
  likesCount: number;
  images: string[];
  tags: TBasicTag[];
  author: TBasicUser;
};
function isTBasicProject(data: any): data is TBasicProject {
  return (
    (typeof data === "object" &&
      data !== null &&
      typeof data.id === "string" &&
      // data.createdAt instanceof Date &&
      // data.updatedAt instanceof Date &&
      typeof data.forSell === "boolean" &&
      typeof data.isVisible === "boolean" &&
      typeof data.carMake === "string" &&
      typeof data.carModel === "string" &&
      // typeof data.isVerified === "boolean" &&
      typeof data.likesCount === "number" &&
      typeof data.engineNameAndCapacity === "string" &&
      typeof data.isLikedByAuthUser === "boolean" &&
      typeof data.hp === "number" &&
      typeof data.nm === "number" &&
      typeof data.engineStockHp === "number" &&
      typeof data.stageNumber === "number" &&
      typeof data.engineStockNm === "number" &&
      typeof data.acc_0_100 === "number") ||
    typeof data.acc_100_200 === "number" ||
    (Array.isArray(data.images) && data.images > 0)
  );
}

type TProjectCreate = {
  forSell: boolean;
  name?: string;
  carMake: string;
  carModel: string;
  description?: string;
  carItemsCount: number;
  imagesCount: number;

  isVisible: boolean;
  garageId: string;
  projectPrice: number;

  engineName: string;
  engineStockHp: number;
  engineStockNm: number;
  engineDescription?: string;
  engineCapacity: number;
  engineWasSwapped: boolean;

  transmissionName: string;
  transmissionGears: number;
  transmissionDescription?: string;
  transmissionWasSwapped?: boolean;
  transmissionType: number; // type -> 0 - maual | 1 - automat -> TransmissionType enum

  stages?: TStageCreate[];
  carItems?: TCarItemCreate[];
  tags?: TTagCreate[];
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
