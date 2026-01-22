import { Company } from "@prisma/client";

export type THistory = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  mileage: number;
  title: string;
  description: string | null;
  price: number | null;
  projectId: string;
  authorId: string;
  companyId: string | null;
  isVisible: boolean;

  company?: Pick<Company, "id" | "name" | "imagesUrl"> | null;
};

export type TBasicHistory = {
  id: string;
  date: Date;
  mileage: number;
  title: string;
  description: string | null;
  price: number | null;
  authorId: string;
  isVisible: boolean;

  company?: Pick<Company, "id" | "name" | "imagesUrl"> | null;
};

export type THistoryCreate = {
  date: string | Date;
  mileage: number | string;
  title: string;
  description?: string;
  price?: number | string;
  projectId: string;
  companyId?: string | null;
  isVisible: boolean;
  relatedItemsIds?: string[];
};

export type TStepHistoryCreate = {
  title: string;
  description: string;
  date: string;
  mileage: string;
  price: string;
  isVisible: boolean;
  companyId?: string | null;
};
