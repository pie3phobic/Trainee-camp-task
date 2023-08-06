import React from "react";
import { TripProps } from "../types";

const TripCard: React.FC<TripProps> = (props) => {
  return (
    <div>
      <div className="flex flex-col justify-center w-[170px] hover: cursor-pointer hover:scale-105 transition duration-200 ease-in-out m-2">
        <img src={props.imageUrl} className="h-[140px]" />
        <div className="px-4 border border-b-gray-200 border-r-gray-200 border-l-gray-200 pb-4">
          <p className="font-semibold text-sm pt-4 pb-2">{props.city}</p>
          <p className="text-xs">
            {props.startDate.split("-").reverse().join(".")}
            {" - "}
            {props.endDate.split("-").reverse().join(".")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
