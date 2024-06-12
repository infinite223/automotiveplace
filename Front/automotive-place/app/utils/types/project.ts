import { TCarItem, TCarItemCreate } from "./carItem";
import { TStageCreate, TStage } from "./stage";
import { TTag } from "./tag";
import { TUser } from "./user";

type TProject = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  forSell: boolean;
  isVisible: boolean;

  carMake: string;
  model: string;
  description?: string;
  isVerified: boolean;
  imagesCount: number;
  likesCount: number;
  carItemsCount: number;
  stagesCount: number;
  garageId: string;
  userId: string;
  isLikedByAuthUser?: boolean;
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
    data.createdAt instanceof Date &&
    data.updatedAt instanceof Date &&
    typeof data.forSell === "boolean" &&
    typeof data.isVisible === "boolean" &&
    typeof data.carMake === "string" &&
    typeof data.model === "string" &&
    typeof data.description === "string" &&
    typeof data.isVerified === "boolean" &&
    typeof data.imagesCount === "number" &&
    typeof data.likesCount === "number" &&
    typeof data.carItemsCount === "number" &&
    typeof data.stagesCount === "number" &&
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
  isVisible: boolean;
  inUse: boolean;
  name: string;
  description?: string;
  authorId: string;
  projectId?: string;
  carMake: string;
  model: string;
  stagesCount: number;

  garageId: string;
  projectPrice: number;

  stages?: TStageCreate[];
  carItems?: TCarItemCreate[];

  engineName: string;
  engineStockHp: number;
  engineStockNm: number;
  engineDescription?: string;
  engineCapacity: number;

  transmissionName: string;
  transmissionGears: number;
  transmissionDescription?: string;
  transmissionWasSwapped?: boolean;
  tags?: TTag[];
};

export type { TProject, TProjectCreate };
export { isTProject };
