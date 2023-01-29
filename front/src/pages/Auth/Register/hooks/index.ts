import { Response, FormValues } from "../../../../@types/Register";
import { RegisterLoginPost } from "../../../../services/http/register";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../navigation/ROUTES";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../yup/index";
import { SubmitHandler, useForm } from "react-hook-form";

export function useRister() {
  const {
    handleSubmit: handle,
    formState: { errors },
    register,
  } = useForm<FormValues>({ resolver: yupResolver(schema) });
  const navigate = useNavigate();
  const { mutate: RegisterPost, isLoading } = useMutation<
    Response,
    AxiosError<any>,
    FormValues
  >((data) => RegisterLoginPost(data), {
    onSuccess: (response) => {
      toast.success("cadastro realizado com sucesso!");
      localStorage.setItem("user", JSON.stringify(response));
      navigate(ROUTES.login);
    },
    onError: (erro) => {
      toast.error(erro.response?.data.errors[0]);
    },
  });

  const handleSubmit: SubmitHandler<FormValues> = (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("as senha precisam ser iguais");
      return;
    }
    RegisterPost(data);
  };

  return {
    handleSubmit,
    RegisterPost,
    register,
    errors,
    handle,
    isLoading,
  };
}
