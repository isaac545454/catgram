/* eslint-disable react-hooks/rules-of-hooks */
import React, { FormEvent } from "react";
import { useData } from "./hooks/index";
import { useQuery } from "@tanstack/react-query";
import { GetProfile } from "../../services/http/profile/getData";

export default function index() {
  const data = useData();
  const { data: dataProfile } = useQuery(["profile"], GetProfile);
  console.log(dataProfile);

  return (
    <div className="border borderr-[#363636] bg-black px-8 py-6 mx-auto my-4 max-w-[40%] text-center">
      <h2 className=" ">Edit os dados do seu PET</h2>
      <p className="">Adicione uma Imagem de Perfil para o seu PET</p>
      <form onSubmit={data.handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="E-mail" disabled />
        <label>
          <span>Imagem do Perfil: </span>
          <input type="file" />
        </label>
        <label>
          <span>Bio</span>
          <input type="text" placeholder="Descrição do perfil" />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input type="password" placeholder="Digite sua nova senha" />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
}
