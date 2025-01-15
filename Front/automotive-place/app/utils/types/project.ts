import { TContentDataOptions } from "../types";
import { TCarItem, TCarItemCreate } from "./carItem";
import { TStageCreate, TStage } from "./stage";
import { TBasicTag, TTag, TTagCreate } from "./tag";
import { TBasicUser, TUser } from "./user";

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
  author?: TUser;

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

  carItems?: TCarItem[];
  stages?: TStage[];
  tags?: TTag[];

  // likes:
  // pickedProjectsOnEventOrSpot:
  // tags:
  // authorId:
  // companyId:
  // location:
};

type TBasicProject = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  forSell: boolean;
  isVisible: boolean;

  name?: string;
  carMake: string;
  carModel: string;
  description?: string;
  isVerified: boolean;

  hp: number;
  nm: number;
  acc_0_100: number;
  acc_100_200: number;

  engineNameAndCapacity: string;
  images?: string[];
  tags: TBasicTag[];
  author: TBasicUser;
};
function isTProject(data: any): data is TBasicProject {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    // data.createdAt instanceof Date &&
    // data.updatedAt instanceof Date &&
    typeof data.forSell === "boolean" &&
    typeof data.isVisible === "boolean" &&
    typeof data.carMake === "string" &&
    typeof data.carModel === "string" &&
    typeof data.description === "string" &&
    typeof data.isVerified === "boolean" &&
    typeof data.hp === "number" &&
    typeof data.nm === "number" &&
    typeof data.acc_0_100 === "number" &&
    typeof data.acc_100_200 === "number" &&
    (Array.isArray(data.images) || data.images === undefined)
  );
}

type TProjectCreate = {
  forSell: boolean;
  inUse: boolean;
  authorId: string;
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

  stages?: TStageCreate[];
  carItems?: TCarItemCreate[];
  tags?: TTagCreate[];
};

export type { TProject, TBasicProject, TProjectCreate };
export { isTProject };
