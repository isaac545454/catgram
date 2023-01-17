/* eslint-disable react-hooks/rules-of-hooks */
import React, { ChangeEvent, Dispatch, useState } from "react";
import { useData } from "./hooks/index";
import { useQuery } from "@tanstack/react-query";
import Input from "../../components/Input";

import { Datas } from "./typesLocal/index";

export default function index() {
  const data = useData();

  return (
    <div className="border borderr-[#363636] bg-black px-8 py-6 mx-auto my-4 max-w-[40%] ">
      <div className="text-center my-4">
        <h2 className=" ">Edit os dados do seu PET</h2>
        <p className="">Adicione uma Imagem de Perfil para o seu PET</p>
      </div>
      <form onSubmit={data.methods.handleSubmit(data.handleSubmit)}>
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
            methods={data.methods}
            validationName="name"
            errors={data.methods.formState.errors}
          />
        </label>

        <input
          type="email"
          placeholder="E-mail"
          disabled
          value={data.DataProfile?.email}
        />

        <label>
          <span>Bio</span>
          <Input
            type="text"
            placeholder="Descrição do perfil"
            methods={data.methods}
            validationName="bio"
            errors={data.methods.formState.errors}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <Input
            type="text"
            placeholder="Digite sua nova senha"
            methods={data.methods}
            validationName="password"
            errors={data.methods.formState.errors}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
}
