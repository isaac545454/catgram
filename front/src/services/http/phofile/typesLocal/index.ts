import { type } from "os";

export type GetUserId = {
  bio: string;
  name: string;
  email: string;
  profileImage: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
};

export type createPhofile = {
  image: string;
  title: string;
  likes: string[];
  comments: comments[];
  userID: string;
  userName: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type comments = {
  comment: string;
  userName: string;
  userImage?: null | string;
  userID: string;
};
