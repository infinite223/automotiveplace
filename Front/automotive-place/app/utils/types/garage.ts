import { TCarItem } from "./carItem";
import { TBasicProject, TProject } from "./project";

export type TCompany = {
  id: string;
  name: string;
  imagesUrl?: string | null;
};

export type TGarage = {
  id: string;
  name: string;
  description: string;
  authorId: string;
  garageId?: string | null;
  companyId?: string | null;
  isBlockedByAdmin?: boolean | null;
  reportId?: string | null;
  createdAt: Date;
  updatedAt: Date;

  projects: TBasicProject[];
  carItems: TCarItem[];
  company: TCompany | null;
};
