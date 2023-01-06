import { Link } from "react-router-dom";
import { BiRotateRight } from "react-icons/bi";

//hooks
import { useState, useEffect } from "react";
import { useRister } from "./hooks";
import { ROUTES } from "../../../navigation/ROUTES";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./yup/index";

import Input from "../../../components/Input";

export default function Register() {
  const { handleSubmit, RegisterPost } = useRister();
  const methods = useForm({ resolver: yupResolver(schema) });

  return (
    <div className="w-[40vw] mt-10 rounded-md bg-black py-8 px-8 mx-auto border border-[#363636]">
      <div className="my-5 text-center">
        <h2 className="font-bold text-2xl">Catgram</h2>
        <p className="font-bold text-gray-400">
          Cadastre-se para postar foto do seu pet
        </p>
      </div>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className="">
        <Input
          placeholder="Nome"
          errors={methods.formState.errors}
          validationName="name"
          methods={methods}
        />
        <Input
          placeholder="E-mail"
          errors={methods.formState.errors}
          validationName="email"
          methods={methods}
        />
        <Input
          placeholder="senha"
          errors={methods.formState.errors}
          validationName="password"
          methods={methods}
        />
        <Input
          placeholder="confirme sua senha "
          errors={methods.formState.errors}
          validationName="confirmPassword"
          methods={methods}
        />
        <button className="flex justify-center items-center">
          {RegisterPost.isLoading ? (
            <BiRotateRight className="animate-spin " color="#fff" size={30} />
          ) : (
            <p>CADASTRAR</p>
          )}
        </button>
        <div className="border-b-2 border-b-[#363636] p-3"></div>
        <p className="text-center mt-4 cursor-pointer">
          ja passui uma conta? <Link to={ROUTES.login}> click aqui</Link>
        </p>
      </form>
    </div>
  );
}
