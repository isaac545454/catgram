import { ChangeEvent } from "react";

export interface Datas {
  handleSubmit: (data: any) => void;
  image: string;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}
export type Data = {
  name: string;
  email: string;
  password: string;
  profileImage: File | undefined;
  bio: string;
};
