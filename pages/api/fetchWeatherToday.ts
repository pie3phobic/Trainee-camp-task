const apiKey = process.env.api_key;
export async function fetchWeatherToday(city: string) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/today?unitGroup=metric&include=days&key=${apiKey}&contentType=json`
  );
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}
