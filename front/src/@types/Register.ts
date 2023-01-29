export interface Response {
  _id: string;
  token: string;
}

export type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
