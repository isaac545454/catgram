import axios from "axios";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { api } from "../../../utils/config";

const url = api + ENDEPOINTS.login;

export const login = async (email: string, password: string) => {
  const res = await axios.post(url!, {
    email: email,
    password: password,
  });

  return res.data;
};
