export type Data = {
  name: string;
  email: string;
  password: string;
  profileImage: File | string;
  bio: string;
};

export type resProfile = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profileImage?: File | undefined;
  bio?: string | undefined;
};
