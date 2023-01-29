/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useData } from "./hooks/index";
import Input from "../../components/Input";

export default function EditProfile() {
  const {
    DataProfile,
    handleImage,
    handle,
    image,
    register,
    handleSubmit,
    errors,
  } = useData();

  return (
    <div className="border borderr-[#363636] bg-black px-8 py-6 mx-auto my-4 max-w-[40%] ">
      <div className="text-center my-4">
        <h2 className=" ">Edit os dados do seu PET</h2>
        <p className="">Adicione uma Imagem de Perfil para o seu PET</p>
      </div>
      <form onSubmit={handle(handleSubmit)}>
        <div className="flex-1  mx-auto my-4">
          <label>
            <img
              src={image}
              alt="foto de perfil"
              className="w-[300px] h-[200px] "
            />
            <input
              type="file"
              className="hidden"
              onChange={handleImage}
              accept="image/png image/jpeg"
            />
          </label>
        </div>
        <label>
          <Input
            type="text"
            placeholder="Nome"
            methods={register}
            validationName="name"
            errors={errors}
          />
        </label>

        <input
          type="email"
          placeholder="E-mail"
          disabled
          value={DataProfile?.email}
        />

        <label>
          <span>Bio</span>
          <Input
            type="text"
            placeholder="Descrição do perfil"
            methods={register}
            validationName="bio"
            errors={errors}
          />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <Input
            type="text"
            placeholder="Digite sua nova senha"
            methods={register}
            validationName="password"
            errors={errors}
          />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  );
}
