type TTag = {
  id: string;
  name: string;

  createdAt: Date;
  updatedAt: Date;
  authorId?: string;
  projectId?: string;
  carItemId?: string;
};

type TTagCreate = {
  localId: string;
  name: string;

  authorId: string;
  projectId?: string;
  carItemId?: string;
};

export type { TTag, TTagCreate };
