import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { LoginReq, LoginRes } from "../../../../@types/Login";
import { login } from "../../../../services/http/login";
import { login as loginHttp } from "../../../../services/http/login";
import { AuthContext, Auth } from "../../../../context/index";
import { useContext } from "react";
import axios from "axios";

export function useLogin() {
  const { setAuth } = useContext(AuthContext);
  //use mutage para o post do login
  const loginPost = useMutation<LoginRes, AxiosError<any>, LoginReq>(
    (data) => loginHttp(data.email, data.password),
    {
      onSuccess: (response) => {
        toast.success("login realizado com sucesso!");
        localStorage.setItem("user", JSON.stringify(response));
        setAuth(response as Auth);
        axios.defaults.headers["Authorization"] = `Bearer ${response.token}`;
      },
      onError: (erro) => {
        toast.error("login inválido");
      },
    }
  );

  //funcao executada pelo onsubmit do react-hook-form
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
    loginPost,
  };
}
