import React from "react";
import { PhotosUploads, UserUploads } from "../../utils/config";
import { Link } from "react-router-dom";
import { useGetPhotos } from "./hooks/useGetPhotos";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { ROUTES } from "../../navigation/ROUTES";

export default function PhotosView() {
  const { getResponsePhoto, verifyLikes, reqLike, setText, text, reqComment } =
    useGetPhotos();

  return (
    <div className="max-w-[600px] mx-auto my-10">
      <img
        src={PhotosUploads + getResponsePhoto?.image}
        alt={getResponsePhoto?.title}
        className="w-full"
      />
      <div className=" mt-2 ">
        <p>
          <span className="font-bold">{getResponsePhoto?.userName}: </span>
          {getResponsePhoto?.title}
        </p>
      </div>
      <div className="mt-2">
        <button
          className=" flex items-center w-full justify-center"
          onClick={() => reqLike(getResponsePhoto?._id!)}
        >
          {verifyLikes() ? (
            <AiTwotoneLike size={30} className="mr-2" />
          ) : (
            <AiOutlineLike size={30} className="mr-2" />
          )}

          <p>{getResponsePhoto?.likes.length} LIKE(S)</p>
        </button>
      </div>
      <div className="mt-4">
        <input
          type="text"
          className="w-full "
          placeholder="digite seu comentario"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="w-full bg-slate-600"
          onClick={() => reqComment(getResponsePhoto?._id!)}
        >
          Comentar
        </button>
      </div>
      <div className="mt-4">
        {getResponsePhoto?.comments.map((item) => (
          <Link to={ROUTES.user(item.userID)}>
            <div className="  mt-4">
              <div className="flex items-center">
                <img
                  src={UserUploads + item.userImage}
                  alt="alt"
                  className="w-[50px] h-[50px] rounded-full mr-4"
                />
                <p className="font-bold text-xl">{item.userName}</p>
              </div>

              <p className="ml-1 mt-2">{item.comment}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
