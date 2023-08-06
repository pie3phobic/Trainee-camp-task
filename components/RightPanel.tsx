import React from "react";
import CountdownTimer from "./CountdownTimer";
import { useState, useEffect } from "react";
import { WeatherProps, TripProps } from "../types";
type RightPanelProps = {
  selectedTrip: TripProps | null; // Assuming TripProps is the type for your trip data
  weatherToday: WeatherProps | null; // Assuming ForecastProps is the type for weather data
};

const RightPanel: React.FC<RightPanelProps> = ({
  selectedTrip,
  weatherToday,
}) => {
  //const timeNow = new Date().getHours();
  const [isDay, setIsDay] = useState(true); // Default to day, can be night too
  useEffect(() => {
    const timeNow = new Date().getHours();
    setIsDay(timeNow >= 7 && timeNow < 19);
  }, []);
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
    if (weatherToday?.days[0].icon.includes("cloudy")) {
      setImageWeather("cloudy");
    } else if (weatherToday?.days[0].icon.includes("clear")) {
      setImageWeather("clear");
    } else if (weatherToday?.days[0].icon.includes("rain")) {
      setImageWeather("rain");
    } else if (weatherToday?.days[0].icon.includes("overcast")) {
      setImageWeather("overcast");
    }
  }, [weatherToday?.days[0].icon]); // Only run when day.icon changes
  return (
    <div
      //   className={`${
      //     timeNow >= 7 && timeNow <= 19 ? "bg-day-pattern" : "bg-night-pattern"
      //   } bg-cover w-[450px] h-[110vh] flex flex-col justify-center items-center`}
      className={`${
        isDay ? "bg-day-pattern" : "bg-night-pattern"
      } bg-cover w-[450px] h-[110vh] flex flex-col justify-center items-center`}
    >
      {selectedTrip && weatherToday && (
        <div className="flex flex-col items-center">
          <h2 className="text-white font-semibold text-3xl">
            {weekdays[new Date(weatherToday.days[0].datetime).getDay()]}
          </h2>
          <div className="flex my-4">
            <img src={`${imageWeather}-with-no-bg.png`} className="w-[60px]" />
            <p className="text-5xl text-white">{weatherToday.days[0].temp}</p>
            <p className="text-lg text-white">°C</p>
          </div>
          <p className="text-white text-2xl font-light">
            {weatherToday.address}
          </p>
          <CountdownTimer startDate={selectedTrip.startDate} />
        </div>
      )}
    </div>
  );
};

export default RightPanel;
