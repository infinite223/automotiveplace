export enum TVisualModificationType {
  FRONT_BUMPER = "FRONT_BUMPER",
  REAR_BUMPER = "REAR_BUMPER",
  SPOILER = "SPOILER",
  SIDE_SKIRT = "SIDE_SKIRT",
  HOOD = "HOOD",
  ROOF = "ROOF",
  WRAP = "WRAP",
  PAINT = "PAINT",
  WHEELS = "WHEELS",
  INTERIOR = "INTERIOR",
  LIGHTING = "LIGHTING",
  OTHER = "OTHER",
}

export const visualTypeTranslations: Record<TVisualModificationType, string> = {
  [TVisualModificationType.FRONT_BUMPER]: "Zderzak przedni",
  [TVisualModificationType.REAR_BUMPER]: "Zderzak tylny",
  [TVisualModificationType.SPOILER]: "Spoiler / Skrzydło",
  [TVisualModificationType.SIDE_SKIRT]: "Progi",
  [TVisualModificationType.HOOD]: "Maska",
  [TVisualModificationType.ROOF]: "Dach",
  [TVisualModificationType.WRAP]: "Okleina (Wrap)",
  [TVisualModificationType.PAINT]: "Lakier",
  [TVisualModificationType.WHEELS]: "Felgi / Koła",
  [TVisualModificationType.INTERIOR]: "Wnętrze",
  [TVisualModificationType.LIGHTING]: "Oświetlenie",
  [TVisualModificationType.OTHER]: "Inne",
};

export type TVisualModification = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  modificationType: TVisualModificationType;
  projectId: string;
  authorId: string;
  companyId?: string;
  isVisible: boolean;
  images: string[];
};

export type TVisualModificationCreate = Pick<
  TVisualModification,
  "name" | "description" | "modificationType" | "isVisible" | "companyId"
> & {
  images: string[];
  imageFile?: File | null;
};

export type TBasicVisualModification = Pick<
  TVisualModification,
  "id" | "name" | "modificationType" | "isVisible" | "description" | "images"
> & {
  thumbnailUrl?: string;
};
