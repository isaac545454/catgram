import axios from "axios";
import { api, uploads } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { resProfile } from "./typesLocal/index";

const url = api + ENDEPOINTS.profile;
const urlPhoto = uploads + ENDEPOINTS.photos;

export const GetProfile = async (): Promise<resProfile> => {
  const res = await axios.get<resProfile>(url);
  // const resPhoto = await axios.get(`http://localhost:3333/api/photos/`);
  // console.log(resPhoto);

  return res.data;
};
