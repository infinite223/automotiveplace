import { TBasicUser } from "./user";

type TProblem = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
};

type TProblemCreate = {
  title: string;
  description: string;
  isVisible: boolean;
};

type TBasicProblem = {
  id: string;
  title: string;
  description: string;
  lastUpdateAt: Date;
  isLikedByAuthUser: boolean;
  likesCount: number;
  author: TBasicUser;
  // TODO :  maybe add last best suggestions / comment
};

function isTBasicProblem(data: any): data is TBasicProblem {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    typeof data.isVisible === "boolean" &&
    typeof data.title === "string" &&
    typeof data.description === "string" &&
    typeof data.likesCount === "number" &&
    typeof data.isLikedByAuthUser === "boolean"
  );
}

function isTProblem(data: any): data is TProblem {
  return (
    typeof data === "object" &&
    data !== null &&
    typeof data.id === "string" &&
    // data.createdAt instanceof Date &&
    // data.updatedAt instanceof Date &&
    typeof data.isVisible === "boolean" &&
    typeof data.title === "string" &&
    typeof data.description === "string"
  );
}

export { isTProblem };
export type { TProblem, TProblemCreate };
