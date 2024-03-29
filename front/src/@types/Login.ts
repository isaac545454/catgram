export interface LoginReq {
  email: string;
  password: string;
}
export interface LoginRes {
  token: string;
  _id: string;
  profileImage?: string;
}

export type FormValues = {
  email: string;
  password: string;
};
