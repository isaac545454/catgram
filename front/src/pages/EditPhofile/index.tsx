import React, { FormEvent } from "react";

export default function index() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };
  return (
    <div>
      <h2 className="">Edit os dados do seu PET</h2>
      <p className="">Adicione uma Imagem de Perfil para o seu PET</p>
      <form onSubmit={handleSubmit}>
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
