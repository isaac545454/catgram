import { getUserId } from "../../../services/http/phofile/getUserId";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { AuthContext } from "../../../context";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const useData = () => {
  const { id } = useParams();
  const { auth } = useContext(AuthContext);
  const { data } = useQuery(["dataPhofile"], () => getUserId(id ? id : ""), {
    onError: (err: Error) => {
      toast.error("OPS... ocorreu um erro ao carregar os dados");
    },
  });

  return {
    data,
    auth,
    id,
  };
};
