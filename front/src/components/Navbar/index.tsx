import React, { useContext } from "react";

import { NavLink, Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsFillPersonFill,
  BsFillCameraFill,
  BsCameraFill,
} from "react-icons/bs";
import { ROUTES } from "../../navigation/ROUTES";
import { AuthContext, AuthProvider } from "../../context/index";

export default function Navbar() {
  const { auth, clearUser } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center bg-black border-b border-b-[#363636] px-4 py-6">
      <Link to="/">Catgram</Link>
      <form className="flex items-center relative w-[20%]">
        <BsSearch className="absolute top-3 left-2 " color="#000" />
        <input
          type="text"
          placeholder="Pesquisar"
          className="pl-10 rounded-md w-[100%]"
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
