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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "../yup/index";
import { UserUploads } from "../../../utils/config";
import { GetProfile } from "../../../services/http/editProfile/getData";
import { useQuery } from "@tanstack/react-query";

export const useData = () => {
  const [image, setImage] = useState<string>(
    "https://tse2.mm.bing.net/th?id=OIP.pwRRtEsCQAZULNdvJMssZAHaE8&pid=Api&P=0"
  );
  const [file, setFile] = useState<File | null>(null);
  const queryClient = useQueryClient();

  //
  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  //
  const { data: DataProfile, isLoading } = useQuery(["profile"], GetProfile, {
    onSuccess: (res) => {
      methods.setValue("name", res.name);
      methods.setValue("bio", res.bio);

      if (res.profileImage) {
        setImage(UserUploads + res.profileImage);
      }
    },
    onError: (err) => {
      toast.error("erro ao carregar os dados");
    },
  });

  //
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

  ///
  const handleSubmit = (data: any) => {
    const req: Data = {
      ...data,
      profileImage: file ? file : "",
    };
    putProfile.mutate(req);
    console.log(req);
  };

  //
  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const image = e.target.files[0];
    if (!image) return;

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setFile(image);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return { handleSubmit, handleImage, image, setImage, methods, DataProfile };
};

export const useSetValue = () => {};
