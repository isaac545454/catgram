import axios from "axios";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { GetPhotosResponse } from "../../../@types/photoView";
import { api } from "../../../utils/config";

export const getPhotos = async (id: string) => {
  const url = api + ENDEPOINTS.deletePhoto(id);

  const response = await axios.get<GetPhotosResponse>(url);

  return response.data;
};
