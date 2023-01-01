import React from "react";

import { Link } from "react-router-dom";

//hooks
import { useState, useEffect } from "react";
import { useRister } from "./hooks";
import { ROUTES } from "../../../navigation/ROUTES";

export default function Register() {
  const { handleSubmit } = useRister();
  return (
    <div className="flex flex-col">
      <h2>Catgram</h2>
      <p className="">Cadastre-se para postar foto do seu pet</p>
      <form onSubmit={handleSubmit} className="">
        <input type="text" placeholder="Nome" />
        <input type="text" placeholder="E-mail" />
        <input type="text" placeholder="senha" />
        <input type="text" placeholder="confirme sua senha " />
        <button>Cadastrar</button>
        <p>
          ja passui uma conta? <Link to={ROUTES.login}>CLIQUE AQUI</Link>
        </p>
      </form>
    </div>
  );
}
