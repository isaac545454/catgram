import axios from "axios";
import { ENDEPOINTS } from "../ENDIPOINTS";
import { Request } from "../../@types/Register";
import { api } from "../../utils/config";

const url = api + ENDEPOINTS.register;

export const RegisterLoginPost = async (data: Request) => {
  const response = await axios.post(url, data);
  console.log(data);

  return response.data;
};
