import React, { useState, useEffect } from "react";
import styles from "../styles/CountdownTimer.module.css";

const CountdownTimer = ({ startDate }) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateCountdown = (startDate: string) => {
    const targetDate = new Date(startDate);
    const currentDate = new Date();
    //@ts-ignore
    const timeDifference = targetDate - currentDate;

    if (timeDifference <= 0) {
      setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;

    const days = Math.floor(timeDifference / oneDay);
    const hours = Math.floor((timeDifference % oneDay) / oneHour);
    const minutes = Math.floor((timeDifference % oneHour) / oneMinute);
    const seconds = Math.floor((timeDifference % oneMinute) / 1000);

    setCountdown({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    calculateCountdown(startDate);
    const interval = setInterval(() => {
      calculateCountdown(startDate);
    }, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className={styles.countdown_container}>
      <div className={styles.countdown_item}>
        <p className={styles.countdown_value}>{countdown.days}</p>
        <p className={styles.countdown_label}>days</p>
      </div>
      <div className={styles.countdown_item}>
        <p className={styles.countdown_value}>{countdown.hours}</p>
        <p className={styles.countdown_label}>hours</p>
      </div>
      <div className={styles.countdown_item}>
        <p className={styles.countdown_value}>{countdown.minutes}</p>
        <p className={styles.countdown_label}>minutes</p>
      </div>
      <div className={styles.countdown_item}>
        <p className={styles.countdown_value}>{countdown.seconds}</p>
        <p className={styles.countdown_label}>seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
