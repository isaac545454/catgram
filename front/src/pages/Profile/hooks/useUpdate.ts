import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SchemaUpdate } from "../yup/index";
import { createPhofile } from "../../../@types/Phofile";
import { AxiosError } from "axios";
import { UpdatePhoto, PropsEdit, FormValues } from "../../../@types/Phofile";
import { updatePhoto } from "../../../services/http/phofile/updatePhoto";
import { useState } from "react";

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
  } = useForm<FormValues>({ resolver: yupResolver(SchemaUpdate) });

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
    onError: () => {
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

  const handleUpdatePhoto: SubmitHandler<FormValues> = (data) => {
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
