import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deletePhotoReq } from "../../../@types/Phofile";
import { deletePhoto } from "../../../services/http/phofile/deletePhotos";

export const useDelete = () => {
  const client = useQueryClient();

  //
  const { mutate: deletePhotoUserReq } = useMutation<
    string,
    AxiosError,
    deletePhotoReq
  >((data) => deletePhoto(data.id), {
    onSuccess() {
      toast.success("Deletado com sucesso!");
      client.invalidateQueries(["photosUser"]);
    },
    onError: () => {
      toast.error("ops... houve um erro");
    },
  });

  const deletePhotoUser = (id: string) => {
    deletePhotoUserReq({ id });
  };

  //
  return {
    deletePhotoUser,
  };
};
