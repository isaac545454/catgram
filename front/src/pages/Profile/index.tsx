import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useData } from "./hooks/index";
import { UserUploads } from "../../utils/config";

export default function Phofile() {
  const data = useData();

  return (
    <div className="max-w-[1200px] mx-auto mt-10">
      <div className="flex items-center justify-center">
        {data.data?.profileImage && (
          <img
            src={UserUploads + data.data.profileImage}
            alt={data.data.name}
            className="w-[110px] h-[100px] rounded-full"
          />
        )}
        <div className="flex flex-col">
          <div className="flex flex-col ml-4 border-b-2 pb-4  border-[#787878]">
            <p> Name: {data?.data?.name}</p>
            {data.data?.bio && <p>Bio: {data.data?.bio}</p>}
          </div>
        </div>
      </div>

      <div className="mt-10">
        {data.id === data.auth?._id && <p>pçaaaaaa</p>}
      </div>
    </div>
  );
}
