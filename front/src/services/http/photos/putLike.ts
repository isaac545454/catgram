import axios from "axios";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { ResponseLike } from "../../../@types/photoView";
import { api } from "../../../utils/config";

export const putLike = async (id: string) => {
  const url = api + ENDEPOINTS.like(id);

  const response = await axios.put<ResponseLike>(url);

  return response.data;
};
