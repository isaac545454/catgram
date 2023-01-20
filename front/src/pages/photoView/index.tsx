import React from "react";
import { PhotosUploads } from "../../utils/config";
import { useParams, Link } from "react-router-dom";
import { useGetPhotos } from "./hooks/useGetPhotos";

export default function PhotosView() {
  const { id } = useParams();
  const { getResponsePhoto } = useGetPhotos();
  console.log(getResponsePhoto);

  return <div>index {id}</div>;
}
