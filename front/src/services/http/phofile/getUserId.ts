import axios from "axios";
import { api } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { GetUserId } from "../../../@types/Phofile";

export const getUserId = async (id: string) => {
  const url = api + ENDEPOINTS.user_id(id);
  const res = await axios.get<GetUserId>(url);

  return res.data;
};
