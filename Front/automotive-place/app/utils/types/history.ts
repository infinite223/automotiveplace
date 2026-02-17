import { Company } from "@prisma/client";

export type THistory = THistoryBase & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

type THistoryBase = {
  id?: string;
  date: Date | string;
  mileage: number | string;
  title: string;
  description?: string | null;
  price?: number | null | string;
  projectId?: string;
  companyId?: string | null;
  authorId?: string;
  isVisible: boolean;

  company?: Pick<Company, "id" | "name" | "imagesUrl"> | null;
};

export type TBasicHistory = Pick<
  THistory,
  | "id"
  | "date"
  | "mileage"
  | "title"
  | "description"
  | "price"
  | "authorId"
  | "isVisible"
  | "company"
>;

export type THistoryCreate = Omit<
  THistoryBase,
  "id" | "authorId" | "company"
> & {
  relatedItemsIds?: string[];
};

export type THistoryEdit = Omit<THistoryBase, "company"> & {
  id: string;
};

export type TStepHistoryCreate = Omit<
  THistoryBase,
  "id" | "authorId" | "company"
>;
