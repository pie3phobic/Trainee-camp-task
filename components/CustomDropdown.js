import React, { useState } from "react";
import citiesData from "../cities.json";
import styles from "../styles/CustomDropdown.module.css";

const CustomDropdown = ({ selectedValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (city) => {
    setIsOpen(false);
    onChange(city);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
        {selectedValue ? (
          <img
            src={citiesData.find((city) => city.city === selectedValue)?.img}
            alt={selectedValue}
            className={styles.optionImage}
          />
        ) : null}
        <p className="text-gray-500">
          {selectedValue || "Please select a city"}
        </p>
      </div>
      {isOpen && (
        <div className={styles.options}>
          {citiesData.map((cityData) => (
            <div
              key={cityData.city}
              className={styles.option}
              onClick={() => handleSelect(cityData.city)}
            >
              <img
                src={cityData.img}
                alt={cityData.city}
                className={styles.optionImage}
              />
              {cityData.city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
