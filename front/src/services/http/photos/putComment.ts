import axios from "axios";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { resComment } from "../../../pages/photoView/typeLocal/index";
import { api } from "../../../utils/config";
import { reqComment } from "../../../pages/photoView/typeLocal";

export const putComment = async (data: reqComment) => {
  const url = api + ENDEPOINTS.comment(data.id);

  const response = await axios.put<resComment>(url, {
    comment: data.comment,
  });

  return response.data;
};
