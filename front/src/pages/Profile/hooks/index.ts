import { getUserId } from "../../../services/http/phofile/getUserId";
import { toast } from "react-toastify";
import { useParams, useNavigate, Route } from "react-router";
import { AuthContext } from "../../../context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "../yup/index";
import { newPost } from "../../../services/http/phofile/newPost";
import { createPhofile } from "../../../services/http/phofile/typesLocal/index";
import { AxiosError } from "axios";
import { ROUTES } from "../../../navigation/ROUTES";

export const useData = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const { mutate } = useMutation<createPhofile, AxiosError<string>, FormData>(
    (data) => newPost(data),
    {
      onSuccess(res) {
        toast.success("publicacado com sucesso!");
        navigate(ROUTES.home);
      },
      onError(err) {
        toast.error("Erro ao carregar");
      },
    }
  );

  const handleSubmit = (data: any) => {
    const form = new FormData();
    form.append("image", data.filePhofile[0]);
    form.append("title", data.title);
    mutate(form);
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
  };
};
