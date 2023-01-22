import axios from "axios";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { api } from "../../../utils/config";
import { createPhofile } from "../../../services/http/phofile/typesLocal/index";

export const getSearch = async (text: string) => {
  const url = api + ENDEPOINTS.search(text);
  const response = await axios.get<createPhofile[]>(url);

  return response.data;
};
