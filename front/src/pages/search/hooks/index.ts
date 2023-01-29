import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getSearch } from "../../../services/http/search/postSearch";
import { putLike } from "../../../services/http/photos/putLike";
import { ResponseLike } from "../../../@types/photoView";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../context";
import { useContext } from "react";
import { useParams } from "react-router";

export const usePageHome = () => {
  const { auth } = useContext(AuthContext);
  const { text } = useParams();

  const { data: dataGetAllPost, isLoading: isLoadingGetALLPost } = useQuery(
    ["getPostsAll", text],
    () => getSearch(text!),
    {
      onError: () => {
        toast.error("ops... houve um erro ");
      },
    }
  );
  const client = useQueryClient();

  const { mutate: mutateLike } = useMutation<ResponseLike, AxiosError, string>(
    (data) => putLike(data),
    {
      onSuccess: () => {
        client.invalidateQueries(["getPostsAll"]);
        toast.success("foto curtida");
      },
      onError: () => {
        toast.error("ops...houve um erro");
      },
    }
  );

  const reqLike = (id: string) => {
    const verify = verifyLikes(id);
    if (verify) return toast.warn("voce ja curtiu essa foto");

    mutateLike(id);
  };

  const verifyLikes = (id: string) => {
    const array = dataGetAllPost!.filter((item) => item._id === id);

    return array[0].likes.includes(auth?._id!);
  };

  return {
    dataGetAllPost,
    reqLike,
    verifyLikes,
  };
};
