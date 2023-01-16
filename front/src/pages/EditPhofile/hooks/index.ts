import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { updatePhofile } from "../../../services/http/editProfile/updateData";
import { Data } from "../typesLocal/index";

export const useData = () => {
  const [image, setImage] = useState<string>(
    "https://tse2.mm.bing.net/th?id=OIP.pwRRtEsCQAZULNdvJMssZAHaE8&pid=Api&P=0"
  );
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  //controle do envio do form
  const putProfile = useMutation<any, AxiosError<any>, Data>(
    (data) => updatePhofile(data),
    {
      onSuccess: (response) => {
        queryClient.invalidateQueries(["profile"]);
        toast.success("perfil atualizado com sucesso!");
      },
      onError: (error) => {
        toast.error("Ops... houve um erro");
      },
    }
  );

  ///envio do formulario
  const handleSubmit = (data: any) => {
    const req: Data = {
      ...data,
      profileImage: file ? file : "",
    };
    putProfile.mutate(req);
    console.log(req);
  };

  //função da imagem aparecer na tela
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const image = e.target.files[0];
    if (!image) return;

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setFile(image);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return { handleSubmit, handleImage, image, setImage };
};

export const useSetValue = () => {};
