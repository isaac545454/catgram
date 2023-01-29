import axios from "axios";
import { ENDEPOINTS } from "../../ENDIPOINTS";
import { resComment, reqComment } from "../../../@types/photoView";
import { api } from "../../../utils/config";

export const putComment = async (data: reqComment) => {
  const url = api + ENDEPOINTS.comment(data.id);

  const response = await axios.put<resComment>(url, {
    comment: data.comment,
  });

  return response.data;
};
