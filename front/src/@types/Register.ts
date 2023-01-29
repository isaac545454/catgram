export interface Response {
  _id: string;
  token: string;
}

export interface Request {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
