import { FormEvent, useEffect } from "react";
import { Response, Request } from "../../../../@types/Register";
import { RegisterLoginPost } from "../../../../services/http/register";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../navigation/ROUTES";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../yup/index";
import { useForm } from "react-hook-form";

export function useRister() {
  ///useMutate para requ post
  const methods = useForm({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const RegisterPost = useMutation<Response, AxiosError<any>, Request>(
    (data) => RegisterLoginPost(data),
    {
      onSuccess: (response) => {
        toast.success("cadastro realizado com sucesso!");
        localStorage.setItem("user", JSON.stringify(response));
        navigate(ROUTES.login);
      },
      onError: (erro) => {
        toast.error(erro.response?.data.errors[0]);
      },
    }
  );

  const handleSubmit = (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast.error("as senha precisam ser iguais");
      return;
    }
    RegisterPost.mutate(data);
  };

  return {
    handleSubmit,
    RegisterPost,
    methods,
  };
}
