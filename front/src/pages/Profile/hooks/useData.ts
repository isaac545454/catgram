import { getUserId } from "../../../services/http/phofile/getUserId";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../../context";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "../yup/index";
import { newPost } from "../../../services/http/phofile/newPost";
import { getAllPostUser } from "../../../services/http/phofile/getAllPostUser";
import { createPhofile, FormValuesData } from "../../../@types/Phofile";
import { AxiosError } from "axios";
import { ROUTES } from "../../../navigation/ROUTES";

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
  } = useForm<FormValuesData>({ resolver: yupResolver(Schema) });

  const { data } = useQuery(["dataPhofile"], () => getUserId(id ? id : ""), {
    onError: (err: Error) => {
      toast.error("OPS... ocorreu um erro ao carregar os dados");
    },
  });

  const { data: dataProfile } = useQuery(["photosUser"], () =>
    getAllPostUser(id ? id : "")
  );

  const { mutate: NewPost } = useMutation<
    createPhofile,
    AxiosError<string>,
    FormData
  >((data) => newPost(data), {
    onSuccess() {
      toast.success("publicacado com sucesso!");
      client.invalidateQueries(["photosUser"]);
      navigate(ROUTES.home);
    },
    onError() {
      toast.error("Erro ao carregar");
    },
  });

  const handleSubmit: SubmitHandler<FormValuesData> = (data) => {
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
