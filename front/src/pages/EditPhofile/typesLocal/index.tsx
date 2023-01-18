import { ChangeEvent } from "react";

export type Data = {
  name: string;
  email: string;
  password: string;
  profileImage: File | undefined;
  bio: string;
};
