import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useData } from "./hooks/index";
import { UserUploads } from "../../utils/config";
import Input from "../../components/Input";

export default function Phofile() {
  const {
    data,
    verifyUser,
    errors,
    register,
    handle,
    handleSubmit,
    dataProfile,
  } = useData();
  console.log(dataProfile);

  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      <div className="flex items-center justify-center">
        {data?.profileImage && (
          <img
            src={UserUploads + data.profileImage}
            alt={data.name}
            className="w-[110px] h-[100px] rounded-full"
          />
        )}
        <div className="flex flex-col">
          <div className="flex flex-col ml-4 border-b-2 pb-4  border-[#787878]">
            <p> Name: {data?.name}</p>
            {data?.bio && <p>Bio: {data?.bio}</p>}
          </div>
        </div>
      </div>

      <div className="mt-10 w-[40vw] mx-auto">
        {verifyUser() && (
          <form onSubmit={handle(handleSubmit)}>
            <div className="my-3 flex  font-bold text-2xl">
              <h1>compartilhe os momentos do seu pet</h1>
            </div>
            <label>
              <span>Titulo para Foto:</span>
              <Input
                methods={register}
                validationName="title"
                errors={errors}
              />
            </label>
            <label>
              <span>Imagem:</span>
              <Input
                methods={register}
                validationName="filePhofile"
                errors={errors}
                type="file"
              />
              <button className="w-full mt-4 bg-blue-500">Postar</button>
            </label>
          </form>
        )}
      </div>
    </div>
  );
}
