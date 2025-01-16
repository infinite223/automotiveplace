type TUser = {
  id: string;
  name: string;
  description: string;
  email?: string;
  imageUrl?: string;
};

type TBasicUser = {
  id: string;
  name: string;
  imageUrl?: string | null;
};

export type { TUser, TBasicUser };
