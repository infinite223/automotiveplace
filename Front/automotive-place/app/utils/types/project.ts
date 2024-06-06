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

  transmissionName: string;
  transmissionGears: number;
  transmissionDescription?: string;
  transmissionWasSwapped?: boolean;
  carItems?: TCarItem[];
  stages?: TStage[]; // stage 0 to stock performance
  tags?: TTag[];
};

type TProjectCreate = {
  forSell: boolean;
  isVisible: boolean;
  inUse: boolean;
  name: string;
  description: string;
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

  transmissionName: string;
  transmissionGears: number;
  transmissionDescription?: string;
  transmissionWasSwapped?: boolean;
  tags?: TTag[];
};

export type { TProject, TProjectCreate };
