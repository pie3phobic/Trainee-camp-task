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

export default function Home() {
  //console.log(picData);
  const startDate = new Date("6.08.2023");
  const formattedStartDate = startDate.toLocaleDateString("en-GB"); // '2023-08-06'
  const endDate = new Date("10.08.2023");
  const formattedEndDate = endDate.toLocaleDateString("en-GB"); // '2023-08-06'
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
  return (
    <div className="">
      <Head>
        <title>Trip App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>
        <div className="mx-10 flex justify-between gap-10">
          {/* Trip list */}
          <div className="w-[600px] flex-1 bg-blue-500">
            <div className="">
              <p className="font-2xl pb-10 pt-4 font-semibold">
                Weather Forecast
              </p>
              <div className="flex">
                {trips.trips.map((trip) => (
                  <div key={trip.city} onClick={() => handleTripClick(trip)}>
                    <TripCard {...trip} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Modal */}
          <div>
            {selectedTrip && weatherForecast && (
              <div>
                <h2>Weather Forecast for {selectedTrip.city}</h2>
                {weatherForecast.days.map((day) => (
                  <div key={day.datetime}>
                    {day.datetime}: {day.conditions}
                  </div>
                ))}
              </div>
            )}
            {selectedTrip && weatherToday && (
              <div>
                <h2>Weather today in {selectedTrip.city}</h2>
                <div>{weatherToday.days[0].description}</div>
              </div>
            )}
          </div>
          {/* Render the custom modal */}
          <CustomModal
            isOpen={isModalOpen}
            onClose={closeModal}
            newTrip={newTrip}
            onChange={setNewTrip}
            onAddTrip={handleAddTrip}
            minDate={minDate}
            maxDate={maxDate}
          />

          {/* Button to open the modal */}
          <button
            className="bg-blue-500 font-semibold rounded-2xl px-8 py-2"
            onClick={openModal}
          >
            Add Trip
          </button>
        </div>
      </main>
    </div>
  );
}
// export async function getStaticProps() {
//   const picData = await fetch("https://www.jsonkeeper.com/b/NTUM").then((res) =>
//     res.json()
//   );
//   return {
//     props: {
//       picData,
//     },
//   };
// }
