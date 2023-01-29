import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { updatePhofile } from "../../../services/http/editProfile/updateData";
import { Data } from "../../../@types/editPhofile";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const {
    register,
    setValue,
    handleSubmit: handle,
    formState: { errors },
  } = useForm<Data>({
    resolver: yupResolver(Schema),
  });

  //
  const { data: DataProfile } = useQuery(["profile"], GetProfile, {
    onSuccess: (res) => {
      setValue("name", res.name);
      setValue("bio", res.bio!);

      if (res.profileImage) {
        setImage(UserUploads + res.profileImage);
      }
    },
    onError: () => {
      toast.error("erro ao carregar os dados");
    },
  });

  //
  const putProfile = useMutation<null, AxiosError, Data>(
    (data) => updatePhofile(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["profile"]);
        toast.success("perfil atualizado com sucesso!");
      },
      onError: () => {
        toast.error("Ops... houve um erro");
      },
    }
  );

  ///
  const handleSubmit: SubmitHandler<Data> = (data) => {
    const req: Data = {
      ...data,
      profileImage: file ? file : "",
    };
    putProfile.mutate(req);
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

  return {
    handleSubmit,
    handleImage,
    image,
    setImage,
    register,
    DataProfile,
    handle,
    errors,
  };
};

export const useSetValue = () => {};
