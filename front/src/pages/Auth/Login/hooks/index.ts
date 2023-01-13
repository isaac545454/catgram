import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { LoginReq, LoginRes } from "../../../../@types/Login";
import { login as loginHttp } from "../../../../services/http/login";
import { AuthContext, Auth } from "../../../../context/index";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../../navigation/ROUTES";

export function useLogin() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  //use mutage para o post do login
  const loginPost = useMutation<LoginRes, AxiosError<any>, LoginReq>(
    (data) => loginHttp(data.email, data.password),
    {
      onSuccess: (response) => {
        toast.success("login realizado com sucesso!");
        localStorage.setItem("user", JSON.stringify(response));
        setAuth(response as Auth);
        axios.defaults.headers["Authorization"] = `Bearer ${response.token}`;
        navigate(ROUTES.home);
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
