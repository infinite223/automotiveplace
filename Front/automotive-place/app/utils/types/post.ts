import { TBasicTag } from "./tag";
import { TBasicUser } from "./user";

type TPostBase = {
  id?: string;
  title: string;
  content?: string;
  imagesUrl?: string | null;
  isVisible: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

type TPost = TPostBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

type TPostCreate = Omit<TPostBase, "id" | "createdAt" | "updatedAt"> & {
  content: string;
};

type TBasicPost = Pick<TPost, "id" | "title" | "content" | "imagesUrl"> & {
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
