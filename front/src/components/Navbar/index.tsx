import React, { FormEvent, useContext, useState } from "react";

import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsCameraFill,
} from "react-icons/bs";
import { ROUTES } from "../../navigation/ROUTES";
import { AuthContext } from "../../context/index";
import { toast } from "react-toastify";

export default function Navbar() {
  const { auth, clearUser } = useContext(AuthContext);
  const [text, setText] = useState<string>("");
  const navigation = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.warn("digite oq deseja pesquisar");
    navigation(ROUTES.search(text));
    setText("");
  };

  return (
    <div className="flex justify-between items-center bg-black border-b border-b-[#363636] px-4 py-6">
      <Link to="/" className="font-bold text-2xl">
        Catgram
      </Link>
      <form
        className="flex items-center relative w-[20%]"
        onSubmit={handleSearch}
      >
        <button type="submit">
          <BsSearch className="absolute top-9 left-2 " color="#000" />
        </button>
        <input
          type="text"
          placeholder="Pesquisar"
          className="pl-10 rounded-md w-[100%]"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <ul className="flex items-center">
        {auth ? (
          <>
            <li className="mr-4">
              <NavLink to={ROUTES.home} className="cursor-pointer ">
                <BsHouseDoorFill size={28} />
              </NavLink>
            </li>
            <li className="mr-4">
              <NavLink to={ROUTES.user(auth._id)} className="cursor-pointer ">
                <BsCameraFill size={28} />
              </NavLink>
            </li>
            <li className="mr-4">
              <NavLink to={ROUTES.profile} className="cursor-pointer ">
                <BsFillPersonFill size={28} />
              </NavLink>
            </li>
            <li onClick={clearUser}>
              <span>SAIR</span>
            </li>
          </>
        ) : (
          <>
            <li className="mr-4">
              <NavLink to={ROUTES.login} className="cursor-pointer ">
                ENTRAR
              </NavLink>
            </li>
            <li className="mr-4">
              <NavLink to={ROUTES.register} className="cursor-pointer ">
                CADASTRAR
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
