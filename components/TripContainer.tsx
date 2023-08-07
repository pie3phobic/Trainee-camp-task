import React, { useRef } from "react";
import TripCard from "./TripCard";
import useSmoothScroll from "../hooks/useSmoothScroll";
import { TripProps } from "../types";
import Controls from "./Controls";
import { PlusIcon } from "@heroicons/react/outline";
import styles from "../styles/TripContainer.module.css";
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
      <div className={styles.container_div}>
        <div
          id="tripContainer"
          ref={tripsContainerRef}
          className={`${styles.trip_container} ${styles.scrollbar_hide} ${styles.transition_transform}`}
        >
          {filteredTrips.map((trip) => (
            <div key={trip.city} onClick={() => handleTripClick(trip)}>
              <TripCard {...trip} />
            </div>
          ))}
        </div>
        <div className={styles.add_trip_button} onClick={openModal}>
          <PlusIcon className={styles.plus_icon} />
          <p className={styles.add_trip_button_label}>Add Trip</p>
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
