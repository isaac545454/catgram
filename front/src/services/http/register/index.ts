import axios from "axios";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { api } from "../../../utils/config";
import { Response, Request } from "../../../@types/Register";

const url = api + ENDEPOINTS.register;

export const RegisterLoginPost = async (data: Request) => {
  const response = await axios.post<Response>(url, data);

  return response.data;
};
