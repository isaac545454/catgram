import axios from "axios";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { createPhofile } from "../../../@types/Phofile";
import { api } from "../../../utils/config";

const url = api + ENDEPOINTS.getAllPost;

export const getAllPost = async () => {
  const response = await axios.get<createPhofile[]>(url);

  return response.data;
};
