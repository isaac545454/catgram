import { ChangeEvent } from "react";

export type Data = {
  name: string;
  email: string;
  password: string;
  profileImage: File | undefined;
  bio: string;
};
interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profileImage?: File | undefined;
  bio?: string | undefined;
}
export interface Datas {
  handleSubmit: (data: any) => void;
  image: string;
  handleImage: (e: ChangeEvent<HTMLInputElement>) => void;
  setImage: React.Dispatch<React.SetStateAction<string>>;
  methods: any;
  DataProfile?: any;
}
