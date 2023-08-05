import { formatDate } from "./formatDate";
import { addTrip } from "../redux/actions/tripActions";
import { CitiesProps, TripProps } from "../types";
export function handleAddTrip(
  newTrip: TripProps,
  dispatch,
  citiesData: CitiesProps
) {
  const formattedStartDate = formatDate(newTrip.startDate);
  const formattedEndDate = formatDate(newTrip.endDate);
  //@ts-ignore
  const selectedCityData = citiesData.find(
    (cityData) => cityData.city === newTrip.city
  );

  const trip = {
    ...newTrip,
    city: newTrip.city,
    startDate: formattedStartDate,
    endDate: formattedEndDate,
    imageUrl: selectedCityData ? selectedCityData.img : "",
  };

  dispatch(addTrip(trip));
}
