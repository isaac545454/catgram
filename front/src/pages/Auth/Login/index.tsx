import { Link } from "react-router-dom";
import { BiRotateRight } from "react-icons/bi";

//hooks

import { useLogin } from "./hooks";
import { ROUTES } from "../../../navigation/ROUTES";

import Input from "../../../components/Input";

export default function Register() {
  const { handleSubmit, loginPost, errors, register, handle } = useLogin();

  return (
    <div className="w-[40vw] mt-10 rounded-md bg-black py-8 px-8 mx-auto border border-[#363636]">
      <div className="my-5 text-center">
        <h2 className="font-bold text-2xl">Catgram</h2>
        <p className="font-bold text-gray-400">
          realize login para poder postar
        </p>
      </div>
      <form onSubmit={handle(handleSubmit)} className="">
        <Input
          placeholder="E-mail"
          errors={errors}
          validationName="email"
          methods={register}
        />
        <Input
          placeholder="senha"
          errors={errors}
          validationName="password"
          methods={register}
        />

        <button className="flex justify-center items-center">
          {loginPost.isLoading ? (
            <BiRotateRight className="animate-spin " color="#fff" size={30} />
          ) : (
            <p>ACESSAR</p>
          )}
        </button>
        <div className="border-b-2 border-b-[#363636] p-3"></div>
        <p className="text-center mt-4 cursor-pointer">
          ainda não tem uma conta? <Link to={ROUTES.register}> click aqui</Link>
        </p>
      </form>
    </div>
  );
}
