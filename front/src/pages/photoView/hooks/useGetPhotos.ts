import { useQuery } from "@tanstack/react-query";
import { getPhotos } from "../../../services/http/photos/getPhotos";
import { GetPhotos } from "../../../services/http/photos/typesLocal/index";
import { useParams } from "react-router-dom";

export const useGetPhotos = () => {
  const { id } = useParams();
  const { data: getResponsePhoto, isLoading: getResponsePhotoLoading } =
    useQuery(["photosFilterId"], () => getPhotos(id ? id : ""));

  return {
    getResponsePhoto,
    getResponsePhotoLoading,
  };
};
