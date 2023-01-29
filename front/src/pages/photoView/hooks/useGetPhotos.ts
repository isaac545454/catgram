import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPhotos } from "../../../services/http/photos/getPhotos";
import { putLike } from "../../../services/http/photos/putLike";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context";
import { toast } from "react-toastify";
import { ResponseLike } from "../../../@types/photoView";
import { AxiosError } from "axios";
import { useState } from "react";
import { reqComment, resComment } from "../../../@types/photoView";
import { putComment } from "../../../services/http/photos/putComment";

export const useGetPhotos = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);

  const [text, setText] = useState<string>("");
  const client = useQueryClient();

  const { data: getResponsePhoto, isLoading: getResponsePhotoLoading } =
    useQuery(["photosFilterId"], () => getPhotos(id ? id : ""));

  const verifyLikes = () => {
    if (getResponsePhoto?.likes.length === 0) return false;

    return getResponsePhoto?.likes.includes(auth?._id!);
  };

  const { mutate: mutateLike } = useMutation<ResponseLike, AxiosError, string>(
    (data) => putLike(data),
    {
      onSuccess: () => {
        client.invalidateQueries(["photosFilterId"]);
        toast.success("foto curtida");
      },
      onError: () => {
        toast.error("ops...houve um erro");
      },
    }
  );

  const { mutate: mutateComment } = useMutation<
    resComment,
    AxiosError,
    reqComment
  >((data) => putComment(data), {
    onSuccess: () => {
      toast.success("comentario inserido com sucesso");
      client.invalidateQueries(["photosFilterId"]);
      setText("");
    },
    onError: () => toast.error("Ops... houve um erro"),
  });

  const reqLike = (id: string) => {
    const LikeTrue = verifyLikes();

    if (LikeTrue) return toast.warn("Voce ja curtiu essa foto");

    mutateLike(id);
  };

  const reqComment = (id: string) => {
    if (text === "") return toast.warn("digite seu comentario");
    const data: reqComment = {
      id: id,
      comment: text,
    };

    mutateComment(data);
  };

  return {
    getResponsePhoto,
    getResponsePhotoLoading,
    verifyLikes,
    reqLike,
    text,
    setText,
    reqComment,
  };
};
