import Head from "next/head";
import Header from "../components/Header";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import { FireIcon } from "@heroicons/react/solid";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTrip } from "../redux/actions/tripActions";
import CustomDropdown from "../components/CustomDropdown";
import citiesData from "../cities.json";
import TripCard from "../components/TripCard";
import CustomModal from "../components/CustomModal";
import {
  PlusIcon,
  ArrowNarrowRightIcon,
  ArrowNarrowLeftIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import ForecastCard from "../components/ForecastCard";
import useSmoothScroll from "../hooks/useSmoothScroll"; // Import the custom hook
import { signIn, signOut, useSession } from "next-auth/react";
import { fetchWeatherForecast } from "./api/fetchWeatherForecast";
import { fetchWeatherToday } from "./api/fetchWeatherToday";
import CountdownTimer from "../components/CountdownTimer";

export default function Home() {
  const { data: session } = useSession();
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
    dispatch(addTrip(trip));
    setNewTrip({
      city: "",
      startDate: "",
      endDate: "",
    });
  };

  console.log(trips);
  const timeNow = new Date().getHours();
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
      fetchWeatherForecast(
        selectedTrip.city,
        selectedTrip.startDate,
        selectedTrip.endDate
      )
        .then(setWeatherForecast)
        .catch((error) => console.error(error));
      fetchWeatherToday(selectedTrip.city).then(setWeatherToday);
    }
  }, [selectedTrip]);

  const handleTripClick = (trip) => {
    const formattedStartDate = formatDate(trip.startDate);
    const formattedEndDate = formatDate(trip.endDate);
    fetchWeatherForecast(trip.city, formattedStartDate, formattedEndDate);
    fetchWeatherToday(trip);
    setSelectedTrip(trip);
  };

  console.log(weatherForecast);
  console.log(weatherToday);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const filteredTrips = trips.trips.filter((trip) =>
    trip.city.toLowerCase().includes(searchInput.toLowerCase())
  );
  //Countdown timer stuff - exported
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
  //Scrolling stuff
  const tripsContainerRef = useRef(null);
  const weatherContainerRef = useRef(null);
  const { scrollLeft, scrollRight } = useSmoothScroll(); // Use the hook
  return (
    <div className="">
      <Head>
        <title>Trip App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Header /> */}
      <main>
        <div className="ml-10 flex gap-7 justify-between">
          {/* Trip list */}
          <div className="w-[600px] flex-1">
            <div className="">
              <div className="flex justify-between pt-4">
                <div className="text-2xl text-gray-800 font-semibold hover:cursor-pointer">
                  Weather <span className="font-bold">Forecast</span>
                </div>
                {session ? (
                  <div className="mr-4 flex flex-col items-end font-semibold text-gray-800">
                    <p className="text-xl">Welcome, {session.user.name}</p>
                    <p
                      className="font-base hover:cursor-pointer text-sm underline text-gray-500"
                      onClick={() => signOut()}
                    >
                      Logout
                    </p>
                  </div>
                ) : (
                  <div
                    className="font-semibold rounded-md text-sm bg-gray-200  text-gray-800 px-4 py-2 mr-8 flex gap-4 hover: cursor-pointer"
                    onClick={() => signIn()}
                  >
                    <img src="google-icon.png" width="20px" />
                    <p>Login with Google</p>
                  </div>
                )}
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
              <div className="flex gap-5 justify-center mr-48 pt-4 text-gray-500">
                <ArrowNarrowLeftIcon
                  className="h-6 hover:scale-110 hover:bg-slate-200 rounded-md px-2 transition-transform ease-in-out duration-200"
                  onClick={() => scrollLeft(tripsContainerRef)}
                />
                <ArrowNarrowRightIcon
                  className="h-6 hover:scale-110 hover:bg-slate-200 rounded-md px-2 transition-transform ease-in-out duration-200"
                  onClick={() => scrollRight(tripsContainerRef)}
                />
              </div>
              <div className="pt-2">
                {selectedTrip && weatherForecast && (
                  <div>
                    <h2 className="font-semibold text-gray-800 text-xl">
                      Week
                    </h2>
                    <div
                      ref={weatherContainerRef}
                      className="flex gap-10 overflow-x-scroll scrollbar-hide pt-6"
                    >
                      {weatherForecast.days.map((day) => (
                        // <div key={day.datetime}>
                        //   <p>{day.datetime}</p>
                        //   <p>{day.conditions}</p>
                        // </div>
                        <ForecastCard {...day} />
                      ))}
                    </div>
                    <div className="flex gap-5 justify-center pt-4 text-gray-500">
                      <ArrowNarrowLeftIcon
                        className="h-6 hover:scale-110 hover:bg-slate-200 rounded-md px-2 transition-transform ease-in-out duration-200"
                        onClick={() => scrollLeft(weatherContainerRef)}
                      />
                      <ArrowNarrowRightIcon
                        className="h-6 hover:scale-110 hover:bg-slate-200 rounded-md px-2 transition-transform ease-in-out duration-200"
                        onClick={() => scrollRight(weatherContainerRef)}
                      />
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
          <div
            className={`${
              timeNow > 7 && timeNow < 19
                ? "bg-day-pattern"
                : "bg-night-pattern"
            } bg-cover w-[450px] h-[110vh] flex flex-col justify-center items-center`}
          >
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
                <CountdownTimer startDate={selectedTrip.startDate} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
