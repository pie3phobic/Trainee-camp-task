export type TripProps = {
  city: string;
  startDate: string;
  endDate: string;
  imageUrl: string;
};
export type ForecastProps = {
  datetime: string;
  conditions: string;
  tempmax: number;
  tempmin: number;
  icon: string;
};
