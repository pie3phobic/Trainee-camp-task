import React, { useState, useEffect } from "react";
import { ForecastProps } from "../types";

const ForecastCard: React.FC<ForecastProps> = (day) => {
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [imageWeather, setImageWeather] = useState("");
  useEffect(() => {
    // Conditionally set the imageWeather state based on day.icon
    if (day.icon.includes("cloudy")) {
      setImageWeather("cloudy");
    } else if (day.icon.includes("clear")) {
      setImageWeather("clear");
    } else if (day.icon.includes("rain")) {
      setImageWeather("rain");
    } else if (day.icon.includes("overcast")) {
      setImageWeather("overcast");
    }
  }, [day.icon]); // Only run when day.icon changes
  return (
    <div className="min-w-[120px] h-[140px] flex flex-col items-center justify-center">
      <p className="text-xs text-gray-500">
        {weekdays[new Date(day.datetime).getDay()]}
      </p>
      {imageWeather && (
        <img src={`${imageWeather}-with-no-bg.png`} className="w-[70px]" />
      )}
      <p>
        {Math.round(day.tempmax)}°/{Math.round(day.tempmin)}°
      </p>
    </div>
  );
};

export default ForecastCard;
