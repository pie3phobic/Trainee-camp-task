import React from "react";
import { TripProps } from "../types";
import styles from "../styles/TripCard.module.css";

const TripCard: React.FC<TripProps> = (props) => {
  return (
    <div>
      <div className={styles.trip_card}>
        <img src={props.imageUrl} className={styles.trip_image} />
        <div className={styles.trip_content}>
          <p className={styles.trip_city}>{props.city}</p>
          <p className={styles.trip_dates}>
            {props.startDate.split("-").reverse().join(".")}
            {" - "}
            {props.endDate.split("-").reverse().join(".")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
