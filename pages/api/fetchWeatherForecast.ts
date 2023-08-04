const apiKey = process.env.api_key;
import { ForecastProps } from "../../types";
type FetchWeatherForecastResponse = {
  data: ForecastProps;
};
export const fetchWeatherForecast = async (
  city: string,
  startDate: string,
  endDate: string
): Promise<FetchWeatherForecastResponse> => {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate}/${endDate}?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to fetch weather forecast");
  }
};
