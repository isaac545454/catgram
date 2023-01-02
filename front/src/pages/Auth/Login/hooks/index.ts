import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { LoginReq, LoginRes } from "../../../../@types/Login";
import { login } from "../../../../services/http/login";
import { login as loginHttp } from "../../../../services/http/login";

export function useLogin() {
  const loginPost = useMutation<LoginRes, AxiosError<any>, LoginReq>(
    (data) => loginHttp(data.email, data.password),
    {
      onSuccess: () => {
        toast.success("login realizado com sucesso!");
      },
      onError: (erro) => {
        toast.error("login inválido");
      },
    }
  );
  const handleSubmit = (data: any) => {
    const { email, password } = data;
    const loginReq: LoginReq = {
      email,
      password,
    };
    loginPost.mutate(loginReq);
  };

  return {
    handleSubmit,
  };
}
