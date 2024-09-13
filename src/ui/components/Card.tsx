import React from "react";

interface CardProps {
  cardId: string;
  description: string;
  dateCreated: string;
}

const Card = ({ cardId, description, dateCreated }: CardProps) => {
  return (
    <div className="relative flex flex-col mx-2 shadow-sm border border-slate-200 rounded-lg w-[24rem] bg-blue-200">
      <div className="p-4">
        <h6 className="mb-2 text-slate-800 text-xl font-bold">Task {cardId}</h6>
        <p className="text-slate-600 leading-normal font-light text-base">
          {description}
        </p>
        <p className="text-base mt-12">
          {dateCreated}
        </p>
        <div className="flex flex-row justify-end gap-2">
          <button className="bg-red-500 rounded-md p-1 px-2 text-white">
            Delete
          </button>
          <button className="bg-blue-400 rounded-md p-1 px-2 text-white">
            Edit
          </button>
          <button className="bg-blue-600 rounded-md p-1 px-2 text-white">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
