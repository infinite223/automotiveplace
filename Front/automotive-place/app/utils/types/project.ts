import { TCarItem, TCarItemCreate } from "./carItem";
import { TStageCreate, TStage } from "./stage";
import { TTag, TTagCreate } from "./tag";
import { TUser } from "./user";

type TProject = {
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
  carItems?: TCarItem[];
  stages?: TStage[]; // stage 0 to stock performance
  tags?: TTag[];
};

function isTProject(data: any): data is TProject {
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
    typeof data.imagesCount === "number" &&
    typeof data.carItemsCount === "number" &&
    typeof data.garageId === "string" &&
    typeof data.userId === "string" &&
    (typeof data.isLikedByAuthUser === "boolean" ||
      data.isLikedByAuthUser === undefined) &&
    (Array.isArray(data.images) || data.images === undefined) &&
    typeof data.authorId === "string" &&
    (typeof data.author === "object" || data.author === undefined) &&
    typeof data.engineName === "string" &&
    typeof data.engineStockHp === "number" &&
    typeof data.engineStockNm === "number" &&
    (typeof data.engineDescription === "string" ||
      data.engineDescription === undefined) &&
    (typeof data.engineWasSwapped === "boolean" ||
      data.engineWasSwapped === undefined) &&
    typeof data.engineCapacity === "number" &&
    typeof data.transmissionName === "string" &&
    typeof data.transmissionGears === "number" &&
    (typeof data.transmissionDescription === "string" ||
      data.transmissionDescription === undefined) &&
    (typeof data.transmissionWasSwapped === "boolean" ||
      data.transmissionWasSwapped === undefined) &&
    (Array.isArray(data.carItems) || data.carItems === undefined) &&
    (Array.isArray(data.stages) || data.stages === undefined) &&
    (Array.isArray(data.tags) || data.tags === undefined)
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

export type { TProject, TProjectCreate };
export { isTProject };
