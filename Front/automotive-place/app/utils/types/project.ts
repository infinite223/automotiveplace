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
  // likes: ....[]
  // garage: Garage
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
};

export type { TProject, TProjectCreate };
