import axios from "axios";
import { api } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { createPhofile } from "./typesLocal/index";

export const newPost = async (data: FormData) => {
  const url = api + ENDEPOINTS.photos;
  const res = await axios.post<createPhofile>(url, data);

  return res.data;
};
