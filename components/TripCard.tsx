import React from "react";
import { TripProps } from "../types";
// const InfoCard: React.FC<CourseProps> = (props) => {

const TripCard: React.FC<TripProps> = (props) => {
  return (
    <div>
      <div className="flex flex-col justify-center w-[200px]">
        <img src={props.imageUrl} className="h-[170px]" />
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
