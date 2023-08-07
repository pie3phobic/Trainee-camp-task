import React, { useState, useEffect } from "react";
import { ForecastProps } from "../types";
import styles from "../styles/ForecastCard.module.css";

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
    if (day.icon.includes("cloudy")) {
      setImageWeather("cloudy");
    } else if (day.icon.includes("clear")) {
      setImageWeather("clear");
    } else if (day.icon.includes("rain")) {
      setImageWeather("rain");
    } else if (day.icon.includes("overcast")) {
      setImageWeather("overcast");
    } else if (day.icon.includes("wind")) {
      setImageWeather("wind");
    }
  }, [day.icon]);
  return (
    <div className={styles.card_container}>
      <p className={styles.card_weekday}>
        {weekdays[new Date(day.datetime).getDay()]}
      </p>
      {imageWeather && (
        <img
          src={`${imageWeather}-with-no-bg.png`}
          className={styles.card_image_weather}
        />
      )}
      <p>
        {Math.round(day.tempmax)}°/{Math.round(day.tempmin)}°
      </p>
    </div>
  );
};

export default ForecastCard;
