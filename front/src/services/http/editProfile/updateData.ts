import axios from "axios";
import { api } from "../../../utils/config";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { Data } from "../../../@types/editPhofile";

const url = api + ENDEPOINTS.user;

export const updatePhofile = async (data: Data) => {
  const form = new FormData();

  const res = await axios.put(url, data);

  if (data.profileImage) {
    form.append("profileImage", data.profileImage);
    form.append("bio", data.bio);
  }

  const resImage = await axios.put(url, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
