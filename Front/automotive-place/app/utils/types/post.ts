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
};

function isTBasicPost(data: any): data is TBasicPost {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    typeof data.title === "string" &&
    typeof data.content === "string" &&
    typeof data.likesCount === "number"
  );
}

export { isTBasicPost };
export type { TPost, TPostCreate, TBasicPost };
