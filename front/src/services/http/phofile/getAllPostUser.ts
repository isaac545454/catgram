import axios from "axios";
import { api } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { createPhofile } from "../../../@types/Phofile";

export const getAllPostUser = async (id: string) => {
  const url = api + ENDEPOINTS.photosUser(id);
  const res = await axios.get<createPhofile[]>(url);

  return res.data;
};
