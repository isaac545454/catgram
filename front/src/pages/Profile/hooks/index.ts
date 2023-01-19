import { getUserId } from "../../../services/http/phofile/getUserId";
import { toast } from "react-toastify";
import { useParams, useNavigate, Route } from "react-router";
import { AuthContext } from "../../../context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "../yup/index";
import { newPost } from "../../../services/http/phofile/newPost";
import { getAllPostUser } from "../../../services/http/phofile/getAllPostUser";
import { createPhofile } from "../../../services/http/phofile/typesLocal/index";
import { AxiosError } from "axios";
import { ROUTES } from "../../../navigation/ROUTES";
import { deletePhotoReq } from "../typesLocal/index";
import { deletePhoto } from "../../../services/http/phofile/deletePhotos";

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

  return {
    data,
    auth,
    id,
    verifyUser,
    register,
    deletePhotoUser,
    errors,
    handleSubmit,
    handle,
    dataProfile,
  };
};
