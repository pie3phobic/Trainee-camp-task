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
export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  newTrip: TripProps;
  onChange: React.Dispatch<React.SetStateAction<TripProps>>;
  onAddTrip: () => void;
  minDate: string | number;
  maxDate: string | number;
};
