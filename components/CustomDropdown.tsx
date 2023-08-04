import React, { useState } from "react";
import citiesData from "../cities.json";
import styles from "../styles/CustomDropdown.module.css";
import { ChevronDownIcon } from "@heroicons/react/solid";
interface CustomDropdownProps {
  selectedValue: string;
  onChange: (city: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  selectedValue,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const handleClick = () => {
    setIsRotated(!isRotated);
  };

  const handleSelect = (city: string) => {
    setIsOpen(false);
    onChange(city);
  };

  return (
    <div className={styles.dropdown} onClick={handleClick}>
      <div className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
        {selectedValue ? (
          <img
            src={citiesData.find((city) => city.city === selectedValue)?.img}
            alt={selectedValue}
            className={styles.optionImage}
          />
        ) : null}
        <div className="flex flex-1 justify-between">
          <p className="text-gray-500">
            {selectedValue || "Please select a city"}
          </p>
          <ChevronDownIcon
            className={`h-6 text-gray-500 transition-transform duration-200 ease-out transform ${
              isRotated ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
      </div>
      {isOpen && (
        <div className={styles.options}>
          {citiesData
            .sort((a, b) => a.city.localeCompare(b.city))
            .map((cityData) => (
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
