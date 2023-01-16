/* eslint-disable react-hooks/rules-of-hooks */
import React, { ChangeEvent, Dispatch, useState } from "react";
import { useData } from "./hooks/index";
import { useQuery } from "@tanstack/react-query";
import { GetProfile } from "../../services/http/editProfile/getData";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "./yup/index";
import { toast } from "react-toastify";
import { Datas } from "./typesLocal/index";
import { UserUploads } from "../../utils/config";

export default function index() {
  const data: Datas = useData();

  const { data: dataProfile, isLoading } = useQuery(["profile"], GetProfile, {
    onSuccess: (res) => {
      methods.setValue("name", res.name);
      methods.setValue("bio", res.bio);

      if (res.profileImage) {
        data.setImage(UserUploads + res.profileImage);
      }
    },
    onError: (err) => {
      toast.error("erro ao carregar os dados");
    },
  });

  const methods = useForm({
    resolver: yupResolver(Schema),
  });

  return (
    <div className="border borderr-[#363636] bg-black px-8 py-6 mx-auto my-4 max-w-[40%] ">
      <div className="text-center my-4">
        <h2 className=" ">Edit os dados do seu PET</h2>
        <p className="">Adicione uma Imagem de Perfil para o seu PET</p>
      </div>
      <form onSubmit={methods.handleSubmit(data.handleSubmit)}>
        <div className="flex-1  mx-auto my-4">
          <label>
            <img
              src={data.image}
              alt="foto de perfil"
              className="w-[300px] h-[200px] "
            />
            <input
              type="file"
              className="hidden"
              onChange={data.handleImage}
              accept="image/png image/jpeg"
            />
          </label>
        </div>
        <label>
          <Input
            type="text"
            placeholder="Nome"
            methods={methods}
            validationName="name"
            errors={methods.formState.errors}
          />
        </label>

        <input
          type="email"
          placeholder="E-mail"
          disabled
          value={dataProfile?.email}
        />

        <label>
          <span>Bio</span>
          <Input
            type="text"
            placeholder="Descrição do perfil"
            methods={methods}
            validationName="bio"
            errors={methods.formState.errors}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <Input
            type="text"
            placeholder="Digite sua nova senha"
            methods={methods}
            validationName="password"
            errors={methods.formState.errors}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
}
