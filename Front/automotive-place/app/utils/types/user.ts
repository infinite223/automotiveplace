type TUser = {
  id: string;
  name: string;
  description: string;
  email?: string;
  imageUrl?: string;
};

type TBaseUser = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type { TUser, TBaseUser };
