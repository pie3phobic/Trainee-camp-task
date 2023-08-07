import React from "react";
import CountdownTimer from "./CountdownTimer";
import { useState, useEffect } from "react";
import { WeatherProps, TripProps } from "../types";
type RightPanelProps = {
  selectedTrip: TripProps | null;
  weatherToday: WeatherProps | null;
};
import styles from "../styles/RightPanel.module.css";

const RightPanel: React.FC<RightPanelProps> = ({
  selectedTrip,
  weatherToday,
}) => {
  const [isDay, setIsDay] = useState(true);
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
  }, [weatherToday?.days[0].icon]);
  return (
    <div
      className={`${styles.background_container} ${
        isDay ? `${styles.bg_day_pattern}` : `${styles.bg_night_pattern}`
      }`}
    >
      {selectedTrip && weatherToday && (
        <div className={styles.right_container}>
          <h2 className={styles.right_weekday}>
            {weekdays[new Date(weatherToday.days[0].datetime).getDay()]}
          </h2>
          <div className={styles.right_weather_container}>
            <img src={`${imageWeather}-with-no-bg.png`} width="60px" />
            <p className={styles.right_weather_temperature}>
              {weatherToday.days[0].temp}
            </p>
            <p className={styles.right_weather_degrees}>°C</p>
          </div>
          <p className={styles.right_city}>{weatherToday.address}</p>
          <CountdownTimer startDate={selectedTrip.startDate} />
        </div>
      )}
    </div>
  );
};

export default RightPanel;
