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
      <div
        className={styles.selected_option}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue ? (
          <img
            src={citiesData.find((city) => city.city === selectedValue)?.img}
            alt={selectedValue}
            className={styles.option_image}
          />
        ) : null}
        <div className={styles.selected_value}>
          <p className={styles.selected_value_text}>
            {selectedValue || "Please select a city"}
          </p>
          <ChevronDownIcon
            className={`${styles.chevron_icon} ${
              isRotated ? `${styles.rotate_180}` : `${styles.rotate_0}`
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
                  className={styles.option_image}
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
