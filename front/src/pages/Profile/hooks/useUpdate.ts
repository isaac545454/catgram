import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaUpdate } from "../yup/index";
import { createPhofile } from "../../../services/http/phofile/typesLocal/index";
import { AxiosError } from "axios";
import { UpdatePhoto, PropsEdit } from "../typesLocal/index";
import { updatePhoto } from "../../../services/http/phofile/updatePhoto";
import { useState } from "react";

////
export const useUpdate = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const client = useQueryClient();
  const [ViewEdit, setViewEdit] = useState<boolean>(false);
  const [dateUpdatdPhotos, setDateUpdatdPhotos] = useState<PropsEdit>({
    id: "",
    title: "",
    profileImage: "",
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit: handle,
  } = useForm({ resolver: yupResolver(SchemaUpdate) });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutate: updatePhotoMutation } = useMutation<
    createPhofile,
    AxiosError<any>,
    UpdatePhoto
  >((data) => updatePhoto(data), {
    onSuccess: () => {
      toast.success("post Atualizado com sucesso!");
      client.invalidateQueries(["photosUser"]);
      setViewEdit(false);
      setDateUpdatdPhotos({ id: "", title: "", profileImage: "" });
    },
    onError: (errro) => {
      toast.error("Ops... houve um Erro");
    },
  });

  const ViewEditPhotosLayout = (data: PropsEdit) => {
    setViewEdit(true);
    setDateUpdatdPhotos(data);
    setValue("titleUpdate", data.title);
  };

  const cancelEdit = () => {
    setViewEdit(false);
    setDateUpdatdPhotos({ id: "", title: "", profileImage: "" });
  };

  const handleUpdatePhoto = (data: any) => {
    const dataReq = {
      title: data.titleUpdate,
      id: dateUpdatdPhotos.id,
    };

    updatePhotoMutation(dataReq);
  };

  return {
    handleUpdatePhoto,
    ViewEdit,
    ViewEditPhotosLayout,
    register,
    errors,
    handle,
    cancelEdit,
    dateUpdatdPhotos,
  };
};
