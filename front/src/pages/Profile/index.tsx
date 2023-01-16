import React from "react";
import { useParams } from "react-router";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getUserId } from "../../services/http/phofile/getUserId";

export default function Phofile() {
  const { id } = useParams();
  const { data } = useQuery(["dataPhofile"], () => getUserId(id ? id : ""));
  console.log(data);

  return (
    <div className="text-white">
      <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
    </div>
  );
}
