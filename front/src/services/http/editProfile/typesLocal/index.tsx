export type resProfile = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profileImage?: File | undefined;
  bio?: string | undefined;
};

export type Data = {
  name: string;
  email: string;
  password: string;
  profileImage: File | undefined;
  bio: string;
};
