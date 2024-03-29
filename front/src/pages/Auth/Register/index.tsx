import { Link } from "react-router-dom";
import { BiRotateRight } from "react-icons/bi";
//
import { useRister } from "./hooks";
import { ROUTES } from "../../../navigation/ROUTES";
//
import Input from "../../../components/Input";

export default function Register() {
  const { handleSubmit, RegisterPost, errors, handle, register, isLoading } =
    useRister();

  return (
    <div className="w-[40vw] mt-10 rounded-md bg-black py-8 px-8 mx-auto border border-[#363636]">
      <div className="my-5 text-center">
        <h2 className="font-bold text-2xl">Catgram</h2>
        <p className="font-bold text-gray-400">
          Cadastre-se para postar foto do seu pet
        </p>
      </div>
      <form onSubmit={handle(handleSubmit)} className="">
        <Input
          placeholder="Nome"
          errors={errors}
          validationName="name"
          methods={register}
        />
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
        <Input
          placeholder="confirme sua senha "
          errors={errors}
          validationName="confirmPassword"
          methods={register}
        />
        <button className="flex justify-center items-center">
          {isLoading ? (
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
