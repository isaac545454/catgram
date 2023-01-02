import axios from "axios";
import { ENDEPOINTS } from "../ENDIPOINTS";

const url = "http://localhost:3333/api/" + ENDEPOINTS.login;

export const login = async (email: string, password: string) => {
  const res = await axios.post(url!, {
    email: email,
    password: password,
  });

  return res.data;
};
