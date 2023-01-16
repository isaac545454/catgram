import React from "react";
import { useParams } from "react-router";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../../services/http/phofile/getUserId";
import { toast } from "react-toastify";
import { api, UserUploads } from "../../utils/config";

export default function Phofile() {
  const { id } = useParams();
  const { data } = useQuery(["dataPhofile"], () => getUserId(id ? id : ""), {
    onError: (err: Error) => {
      toast.error("OPS... ocorreu um erro ao carregar os dados");
    },
  });
  console.log(data);

  return (
    <div className="flex justify-center mt-8 items-center ">
      {data?.profileImage && (
        <img
          src={UserUploads + data.profileImage}
          alt={data.name}
          className="w-[110px] h-[100px] rounded-full"
        />
      )}
      <div className="flex flex-col ml-4 border-b-2 pb-4  border-[#787878]">
        <p> Name: {data?.name}</p>
        {data?.bio && <p>Bio: {data.bio}</p>}
      </div>
    </div>
  );
}
