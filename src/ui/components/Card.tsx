"use client";
import React from "react";
import { CardInfo } from "./Board";
import { useRouter } from "next/navigation";

const Card = ({id,title,description,createdAt }: CardInfo) => {
  const router = useRouter();

  const editTask = () => {
    console.log("Editing task with id:", id);
    router.push("/board/editTask/"+id.toString());
  };
  const viewTask = () => {
    console.log("Viewing task with id:", id);
    router.push("/board/viewTask/"+id.toString());
  };


  return (
    <div className="relative flex flex-col mx-2 shadow-sm border border-slate-200 rounded-lg w-[24rem] bg-blue-200">
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-bold">{title}</h6>
        <p className="text-slate-600 leading-normal font-light text-lg">
          {description}
        </p>
        <p className="text-base mt-12">{createdAt}</p>
        <div className="flex flex-row justify-end gap-2">
          <button className="bg-red-500 rounded-md p-1 px-2 text-white">
            Delete
          </button>
          <button
            className="bg-blue-400 rounded-md p-1 px-2 text-white"
            onClick={editTask}
          >
            Edit
          </button>
          <button
            className="bg-blue-600 rounded-md p-1 px-2 text-white"
            onClick={viewTask}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
