import { FormEvent, useEffect } from "react";
import { Response, Request } from "../../../../@types/Register";
import { RegisterLoginPost } from "../../../../services/http/register";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

export function useRister() {
  ///useMutate para requ post
  const RegisterPost = useMutation<Response, AxiosError<any>, Request>(
    (data) => RegisterLoginPost(data),
    {
      onSuccess: () => {
        toast.success("cadastro realizado com sucesso!");
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
  };
}
