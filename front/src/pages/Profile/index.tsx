import {
  BsFillEyeFill,
  BsPencilFill,
  BsX,
  BsXLg,
  BsTrash,
} from "react-icons/bs";
import { useData } from "./hooks/useData";
import { UserUploads } from "../../utils/config";
import Input from "../../components/Input";
import { useDelete } from "./hooks/useDelete";
import { useUpdate } from "./hooks/useUpdate";
import { PhotosUploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";

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
  const { deletePhotoUser } = useDelete();
  const {
    handleUpdatePhoto,
    ViewEditPhotosLayout,
    ViewEdit,
    errors: errorsUpdate,
    register: registerUpdate,
    handle: handleUpdate,
    dateUpdatdPhotos,
    cancelEdit,
  } = useUpdate();

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
        {verifyUser() && !ViewEdit && (
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
        {ViewEdit && (
          <form onSubmit={handleUpdate(handleUpdatePhoto)}>
            <div className="my-3 flex  font-bold text-2xl">
              <h1>edit sua publicação</h1>
            </div>
            <div className="flex justify-center mb-3">
              <img
                src={PhotosUploads + dateUpdatdPhotos.profileImage}
                alt={dateUpdatdPhotos.title}
                className=" w-full "
              />
            </div>
            <label>
              <span>deseja alterar o Titulo para:</span>
              <Input
                methods={registerUpdate}
                validationName="titleUpdate"
                errors={errorsUpdate}
              />
            </label>
            <label>
              <button className="w-full mt-4 bg-blue-500">Atualizar</button>
            </label>
            <span className="w-full mt-4 p-2 bg-slate-500" onClick={cancelEdit}>
              Cancelar
            </span>
          </form>
        )}
        <div className="my-4">
          {dataProfile && (
            <>
              <h2 className="font-bold text-xl mb-3">Fotos Publicadas</h2>
              {dataProfile?.length === 0 && <p>Ainda não a publicações</p>}
              {dataProfile.map((item) => (
                <div key={item._id} className="mb-5">
                  <img
                    src={PhotosUploads + item.image}
                    alt={item.title}
                    className="w-full"
                  />

                  {verifyUser() ? (
                    <div className="flex w-full justify-around cursor-pointer my-4">
                      <Link to={ROUTES.photosView(item._id)}>
                        <BsFillEyeFill size={25} />
                      </Link>
                      <span
                        onClick={() =>
                          ViewEditPhotosLayout({
                            id: item._id,
                            title: item.title,
                            profileImage: item.image,
                          })
                        }
                      >
                        <BsPencilFill size={25} />
                      </span>
                      <span onClick={() => deletePhotoUser(item._id)}>
                        <BsTrash size={25} />
                      </span>
                    </div>
                  ) : (
                    <Link
                      to={ROUTES.photosView(item._id)}
                      className="w-full flex  justify-center bg-blue-500 p-3"
                    >
                      <BsFillEyeFill size={25} />
                    </Link>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
