import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { FireIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTrip } from "../redux/actions/tripActions";
import CustomDropdown from "../components/CustomDropdown";
import citiesData from "../cities.json";
import TripCard from "../components/TripCard";
import CustomModal from "../components/CustomModal";
import { PlusIcon } from "@heroicons/react/outline";
import {
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import ForecastCard from "../components/ForecastCard";

export default function Home() {
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const trips = useSelector((state) => state.trips);
  const dispatch = useDispatch();
  const [newTrip, setNewTrip] = useState({
    city: "",
    startDate: "",
    endDate: "",
  });

  const handleAddTrip = () => {
    const formattedStartDate = formatDate(newTrip.startDate);
    const formattedEndDate = formatDate(newTrip.endDate);
    const selectedCityData = citiesData.find(
      (cityData) => cityData.city === newTrip.city
    );
    // Create the trip object with the city name, start date, end date, and image URL
    const trip = {
      ...newTrip,
      city: newTrip.city,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      imageUrl: selectedCityData ? selectedCityData.img : "", // Set the image URL based on selected city
    };
    // Dispatch the action with the current newTrip values
    //dispatch(addTrip(newTrip));
    dispatch(addTrip(trip));
    setNewTrip({
      city: "",
      startDate: "",
      endDate: "",
    });
  };

  console.log(trips);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const today = new Date();
  const next15Days = new Date(today);
  next15Days.setDate(next15Days.getDate() + 15);
  const minDate = formatDate(today);
  const maxDate = formatDate(next15Days);
  //Trip weather forecast fetch
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [weatherToday, setWeatherToday] = useState(null);

  useEffect(() => {
    if (selectedTrip) {
      fetchWeatherForecast(selectedTrip);
    }
  }, [selectedTrip]);

  const fetchWeatherForecast = async (selectedTrip) => {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/${selectedTrip.startDate}/${selectedTrip.endDate}?unitGroup=metric&include=days&key=${process.env.api_key}&contentType=json`
    );
    if (response.ok) {
      const data = await response.json();
      setWeatherForecast(data);
    } else {
      console.error("Failed to fetch weather forecast");
    }
  };
  const fetchWeatherToday = async (selectedTrip) => {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${selectedTrip.city}/today?unitGroup=metric&include=days&key=${process.env.api_key}&contentType=json`
    );
    if (response.ok) {
      const data = await response.json();
      setWeatherToday(data);
    } else {
      console.error("Failed to fetch todays weather");
    }
  };
  const handleTripClick = (trip) => {
    // Format the start date and end date before fetching the weather forecast
    const formattedStartDate = formatDate(trip.startDate);
    const formattedEndDate = formatDate(trip.endDate);
    // Fetch the weather forecast with the formatted dates
    fetchWeatherForecast(trip.city, formattedStartDate, formattedEndDate);
    fetchWeatherToday(trip);
    // Set the selected trip
    setSelectedTrip(trip);
  };

  console.log(weatherForecast);
  console.log(weatherToday);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  //Countdown timer stuff
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateCountdown = (startDate) => {
    const targetDate = new Date(startDate);
    const currentDate = new Date();
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
    if (selectedTrip) {
      calculateCountdown(selectedTrip.startDate);

      // Update the countdown every second
      const interval = setInterval(() => {
        calculateCountdown(selectedTrip.startDate);
      }, 1000);

      // Clean up the interval on component unmount
      return () => clearInterval(interval);
    }
  }, [selectedTrip]);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const [imageWeather, setImageWeather] = useState("");
  useEffect(() => {
    // Conditionally set the imageWeather state based on day.icon
    if (weatherToday?.days[0].icon.includes("cloudy")) {
      setImageWeather("cloudy");
    } else if (weatherToday?.days[0].icon.includes("clear")) {
      setImageWeather("clear");
    } else if (weatherToday?.days[0].icon.includes("rain")) {
      setImageWeather("rain");
    } else if (weatherToday?.days[0].icon.includes("overcast")) {
      setImageWeather("overcast");
    }
  }, [weatherToday?.days[0].icon]); // Only run when day.icon changes
  return (
    <div className="">
      <Head>
        <title>Trip App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <main>
        <div className="ml-10 flex justify-between">
          {/* Trip list */}
          <div className="w-[600px] flex-1">
            <div className="">
              <div className="text-2xl text-gray-800 pt-4 font-semibold">
                Weather <span className="font-bold">Forecast</span>
              </div>
              <div className="flex bg-gray-200 rounded-md h-[40px] w-[200px] justify-center gap-2 my-12">
                <div className="pt-1 pl-6">
                  <SearchIcon className="h-8 p-1 text-gray-800 rounded-full cursor-pointer" />
                </div>
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-transparent font-semibold outline-none text-sm text-gray-700 placeholder-gray-700 hidden md:block"
                  type="text"
                  placeholder={"Search your trip"}
                />
              </div>
              <div className="flex gap-5 flex-1">
                <div className="overflow-x-scroll space-x-8 scrollbar-hide flex">
                  {trips.trips.map((trip) => (
                    <div key={trip.city} onClick={() => handleTripClick(trip)}>
                      <TripCard {...trip} />
                    </div>
                  ))}
                </div>
                <div
                  className="bg-gray-300 min-w-[190px] h-[170px] flex flex-col items-center justify-center cursor-pointer"
                  onClick={openModal}
                >
                  <PlusIcon className="h-6" />
                  <p className="font-semibold rounded-2xl">Add Trip</p>
                </div>
              </div>
              <div className="pt-6">
                {selectedTrip && weatherForecast && (
                  <div>
                    <h2 className="font-semibold text-gray-800 text-xl">
                      Week
                    </h2>
                    <div className="flex gap-10 overflow-x-scroll scrollbar-hide pt-10">
                      {weatherForecast.days.map((day) => (
                        // <div key={day.datetime}>
                        //   <p>{day.datetime}</p>
                        //   <p>{day.conditions}</p>
                        // </div>
                        <ForecastCard {...day} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <CustomModal
            isOpen={isModalOpen}
            onClose={closeModal}
            newTrip={newTrip}
            onChange={setNewTrip}
            onAddTrip={handleAddTrip}
            minDate={minDate}
            maxDate={maxDate}
          />
          <div className="bg-blue-900 w-[450px] h-screen flex flex-col justify-center items-center">
            {/* {selectedTrip && weatherToday && (
              <div>
                <h2>Weather today in {selectedTrip.city}</h2>
                <div>{weatherToday.days[0].description}</div>
              </div>
            )} */}
            {selectedTrip && weatherToday && (
              <div className="flex flex-col items-center">
                <h2 className="text-white font-semibold text-3xl">
                  {weekdays[new Date(weatherToday.days[0].datetime).getDay()]}
                </h2>
                <div className="flex my-4">
                  <img
                    src={`${imageWeather}-with-no-bg.png`}
                    className="w-[60px]"
                  />
                  <p className="text-5xl text-white">
                    {weatherToday.days[0].temp}
                  </p>
                  <p className="text-lg text-white">°C</p>
                </div>
                <p className="text-white text-2xl font-light">
                  {weatherToday.address}
                </p>
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
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
