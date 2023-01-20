import { getUserId } from "../../../services/http/phofile/getUserId";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../../context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema, SchemaUpdate } from "../yup/index";
import { newPost } from "../../../services/http/phofile/newPost";
import { getAllPostUser } from "../../../services/http/phofile/getAllPostUser";
import { createPhofile } from "../../../services/http/phofile/typesLocal/index";
import { AxiosError } from "axios";
import { ROUTES } from "../../../navigation/ROUTES";
import { deletePhotoReq, UpdatePhoto, PropsEdit } from "../typesLocal/index";
import { deletePhoto } from "../../../services/http/phofile/deletePhotos";
import { updatePhoto } from "../../../services/http/phofile/updatePhoto";
import { useState } from "react";

////
export const useData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const client = useQueryClient();
  const { auth } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit: handle,
  } = useForm({ resolver: yupResolver(Schema) });

  const { data } = useQuery(["dataPhofile"], () => getUserId(id ? id : ""), {
    onError: (err: Error) => {
      toast.error("OPS... ocorreu um erro ao carregar os dados");
    },
  });

  //
  const { data: dataProfile } = useQuery(["photosUser"], () =>
    getAllPostUser(id ? id : "")
  );

  //
  const { mutate: NewPost } = useMutation<
    createPhofile,
    AxiosError<string>,
    FormData
  >((data) => newPost(data), {
    onSuccess(res) {
      toast.success("publicacado com sucesso!");
      client.invalidateQueries(["photosUser"]);
      navigate(ROUTES.home);
    },
    onError(err) {
      toast.error("Erro ao carregar");
    },
  });

  //
  const handleSubmit = (data: any) => {
    const form = new FormData();
    form.append("image", data.filePhofile[0]);
    form.append("title", data.title);
    NewPost(form);
  };

  const verifyUser = () => {
    if (id === auth?._id) {
      return true;
    }
    return false;
  };

  return {
    data,
    auth,
    id,
    verifyUser,
    register,

    errors,
    handleSubmit,
    handle,
    dataProfile,
  };
};

////
export const useDelete = () => {
  const client = useQueryClient();

  //
  const { mutate: deletePhotoUserReq } = useMutation<
    string,
    AxiosError<any>,
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
    console.log(data);
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
    console.log(dataReq);

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
