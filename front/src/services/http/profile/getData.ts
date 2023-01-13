import axios from "axios";
import { api } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";

const url = api + ENDEPOINTS.profile;

type resProfile = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profileImage: File | undefined;
  bio?: string | undefined;
};

export const GetProfile = async (): Promise<resProfile> => {
  const res = await axios.get<resProfile>(url);

  return res.data;
};
