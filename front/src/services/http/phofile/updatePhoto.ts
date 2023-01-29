import axios from "axios";
import { api } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { createPhofile, PropsReq } from "../../../@types/Phofile";

export const updatePhoto = async (data: PropsReq) => {
  const url = api + ENDEPOINTS.deletePhoto(data.id);
  const res = await axios.put<createPhofile>(url, { title: data.title });

  return res.data;
};
