export interface deletePhotoReq {
  id: string;
}

export interface FormValuesData {
  title: string;
  filePhofile: File[];
}

export interface UpdatePhoto {
  title: string;
  id: string;
}

export type FormValues = {
  titleUpdate: string;
  id: string;
};

export interface PropsEdit {
  title: string;
  id: string;
  profileImage: string;
}

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

export type titleUpdate = {
  title: string;
  filePhofile: string;
};

type comments = {
  comment: string;
  userName: string;
  userImage?: null | string;
  userID: string;
};

export type PropsReq = {
  id: string;
  title: string;
};
