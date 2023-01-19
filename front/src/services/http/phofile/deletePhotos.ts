import axios from "axios";
import { api } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";

export const deletePhoto = async (id: string) => {
  const url = api + ENDEPOINTS.deletePhoto(id);
  const res = await axios.delete(url);

  return res.data;
};
