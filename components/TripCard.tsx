import React from "react";
import { TripProps } from "../types";
// const InfoCard: React.FC<CourseProps> = (props) => {

const TripCard: React.FC<TripProps> = (props) => {
  return (
    <div>
      <div className="bg-gray-200 rounded-3xl flex flex-col justify-center items-center w-[150px] h-[200px]">
        <img src={props.imageUrl} className="w-[100px] rounded-3xl" />
        <p className="font-semibold">{props.city}</p>
      </div>
    </div>
  );
};

export default TripCard;
