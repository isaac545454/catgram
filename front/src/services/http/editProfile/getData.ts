import axios from "axios";
import { api, uploads } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { resProfile } from "./typesLocal/index";

const url = api + ENDEPOINTS.profile;

export const GetProfile = async (): Promise<resProfile> => {
  const res = await axios.get<resProfile>(url);
  return res.data;
};
