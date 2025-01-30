import { TBasicTag } from "./tag";
import { TBasicUser } from "./user";

type TPost = {
  id: string;
  title: string;
  content: string;
  imagesUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
};

type TPostCreate = {
  title: string;
  description: string;
  isVisible: boolean;
};

type TBasicPost = {
  id: string;
  title: string;
  content: string;
  imagesUrl: string | null;
  isLikedByAuthUser: boolean;
  likesCount: number;
  lastUpdateAt: Date;
  author: TBasicUser;
  tags: TBasicTag[];
};

function isTBasicPost(data: any): data is TBasicPost {
  return (
    (typeof data === "object" &&
      data !== null &&
      typeof data.id === "string" &&
      typeof data.title === "string" &&
      typeof data.content === "string" &&
      typeof data.likesCount === "number" &&
      typeof data.isLikedByAuthUser === "boolean" &&
      typeof data.imagesUrl === "string") ||
    data.imagesUrl === null
  );
}

export { isTBasicPost };
export type { TPost, TPostCreate, TBasicPost };
