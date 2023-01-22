import React from "react";
import { usePageHome } from "./hooks/index";
import { PhotosUploads } from "../../utils/config";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import { ROUTES } from "../../navigation/ROUTES";

export default function Home() {
  const { dataGetAllPost, verifyLikes, reqLike } = usePageHome();

  return (
    <div className="w-[800px] mx-auto my-4">
      {dataGetAllPost?.map((item) => (
        <div className="my-8" key={item._id}>
          <img
            src={PhotosUploads + item.image}
            alt={item.title}
            className="w-full "
          />
          <div className="my-2 mx-2 flex">
            <p className="font-bold mr-1">{item.userName}: </p>
            <span> {item.title}</span>
          </div>
          <div className="">
            <button
              className=" flex items-center w-full justify-center"
              onClick={() => reqLike(item?._id!)}
            >
              {verifyLikes(item._id) ? (
                <AiTwotoneLike size={30} className="mr-2" />
              ) : (
                <AiOutlineLike size={30} className="mr-2" />
              )}

              <p>{item?.likes.length} LIKE(S)</p>
            </button>
            <Link to={ROUTES.photosView(item?._id)}>
              <button className="w-full p-4 justify-center bg-slate-600">
                Detalhes
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
