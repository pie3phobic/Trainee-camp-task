import React, { useRef } from "react";
import Controls from "./Controls";
import ForecastCard from "./ForecastCard";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { TripProps, WeatherProps } from "../types";
type WeatherForecastPanelProps = {
  selectedTrip: TripProps | null;
  weatherForecast: WeatherProps | null;
};

const WeatherForecatPanel: React.FC<WeatherForecastPanelProps> = ({
  selectedTrip,
  weatherForecast,
}) => {
  const weatherContainerRef = useRef(null);
  const { scrollLeft, scrollRight } = useSmoothScroll(); // Use the hook
  return (
    <div className="pt-2">
      {selectedTrip && weatherForecast && (
        <div>
          <h2 className="font-semibold text-gray-800 text-xl">Week</h2>
          <div
            ref={weatherContainerRef}
            className="flex gap-10 overflow-x-scroll scrollbar-hide pt-6"
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
