import React, { useRef } from "react";
import Controls from "./Controls";
import ForecastCard from "./ForecastCard";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { TripProps, WeatherProps } from "../types";
import styles from "../styles/WeatherForecastPanel.module.css";
type WeatherForecastPanelProps = {
  selectedTrip: TripProps | null;
  weatherForecast: WeatherProps | null;
};

const WeatherForecatPanel: React.FC<WeatherForecastPanelProps> = ({
  selectedTrip,
  weatherForecast,
}) => {
  const weatherContainerRef = useRef(null);
  const { scrollLeft, scrollRight } = useSmoothScroll();
  return (
    <div className={styles.forecast_panel_container}>
      {selectedTrip && weatherForecast && (
        <div>
          <h2 className={styles.forecast_panel_header}>Week</h2>
          <div
            ref={weatherContainerRef}
            className={`${styles.forecast_cards_container} ${styles.scrollbar_hide}`}
          >
            {weatherForecast.days.map((day) => (
              <div key={day.datetime}>
                <ForecastCard {...day} />
              </div>
            ))}
          </div>
          <Controls
            scrollLeft={scrollLeft}
            scrollRight={scrollRight}
            containerRef={weatherContainerRef}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherForecatPanel;
