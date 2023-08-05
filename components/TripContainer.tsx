import React, { useRef } from "react";
import TripCard from "./TripCard";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { TripProps } from "../types";
import Controls from "./Controls";
import { PlusIcon } from "@heroicons/react/outline";
interface TripContainerProps {
  filteredTrips: TripProps[];
  handleTripClick: (trip: TripProps) => void;
  openModal: () => void;
}

const TripContainer: React.FC<TripContainerProps> = ({
  filteredTrips,
  handleTripClick,
  openModal,
}) => {
  const tripsContainerRef = useRef(null);
  const { scrollLeft, scrollRight } = useSmoothScroll();
  return (
    <div>
      <div className="flex gap-5 flex-1">
        <div
          id="tripContainer"
          ref={tripsContainerRef}
          className="overflow-x-scroll space-x-8 scrollbar-hide flex transition-transform duration-300 ease-linear"
        >
          {filteredTrips.map((trip) => (
            <div key={trip.city} onClick={() => handleTripClick(trip)}>
              <TripCard {...trip} />
            </div>
          ))}
        </div>
        <div
          className="bg-gray-300 min-w-[190px] mt-2 h-[170px] flex flex-col items-center justify-center cursor-pointer"
          onClick={openModal}
        >
          <PlusIcon className="h-6" />
          <p className="font-semibold rounded-2xl">Add Trip</p>
        </div>
      </div>
      <Controls
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
        containerRef={tripsContainerRef}
      />
    </div>
  );
};

export default TripContainer;
