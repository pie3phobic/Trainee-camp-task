import React, { useState, useEffect } from "react";

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

    // Update the countdown every second
    const interval = setInterval(() => {
      calculateCountdown(startDate);
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [startDate]);

  return (
    <div className="mt-24 flex gap-5 justify-center items-center uppercase text-white">
      <div className="flex flex-col justify-center items-center">
        <p className="font-black text-2xl">{countdown.days}</p>
        <p className="text-sm font-light">days</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-black text-2xl">{countdown.hours}</p>
        <p className="text-sm font-light">hours</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-black text-2xl">{countdown.minutes}</p>
        <p className="text-sm font-light">minutes</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-black text-2xl">{countdown.seconds}</p>
        <p className="text-sm font-light">seconds</p>
      </div>
    </div>
  );
};

export default CountdownTimer;
