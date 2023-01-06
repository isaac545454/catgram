import axios from "axios";
import { ENDEPOINTS } from "../ENDIPOINTS";
import { Request } from "../../@types/Register";

const url = "http://localhost:3333/api/" + ENDEPOINTS.register;

export const RegisterLoginPost = async (data: Request) => {
  const response = await axios.post(url, data);
  console.log(data);

  return response.data;
};
