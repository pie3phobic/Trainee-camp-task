import React from "react";
import CustomDropdown from "./CustomDropdown";
import styles from "../styles/Home.module.css";
import { XIcon } from "@heroicons/react/solid";
import { ModalProps } from "../types";
const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  newTrip,
  onChange,
  onAddTrip,
  minDate,
  maxDate,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className="bg-white rounded-sm flex flex-col">
        <div className="flex justify-between border-b border-b-gray-200 w-[550px] py-3 px-5">
          <p className="font-semibold text-xl text-gray-800">Create trip</p>
          <XIcon
            className="h-6 text-gray-400 cursor-pointer"
            onClick={onClose}
          />
        </div>
        <label
          htmlFor="city"
          className="text-base font-semibold text-gray-700 px-5 pt-14 pb-2"
        >
          <span className="text-red-500">* </span>City
        </label>
        <div className="px-5">
          <CustomDropdown
            selectedValue={newTrip.city}
            onChange={(city) => onChange({ ...newTrip, city })}
          />
        </div>
        <label
          htmlFor="startDate"
          className="text-base font-semibold text-gray-700 px-5 py-2"
        >
          <span className="text-red-500">* </span>Start date
        </label>
        <input
          type="date"
          id="startDate"
          value={newTrip.startDate}
          placeholder="Start Date"
          min={minDate} // Set the minimum date to today
          max={maxDate} // Set the maximum date to the next 15 days
          onChange={(e) => onChange({ ...newTrip, startDate: e.target.value })}
          className="mx-5 px-2 border border-gray-300 py-2 text-gray-500"
          required
        />
        <label
          htmlFor="endDate"
          className="text-base font-semibold text-gray-700 px-5 py-2"
        >
          <span className="text-red-500">* </span>End date
        </label>
        <input
          type="date"
          id="endDate"
          value={newTrip.endDate}
          onChange={(e) => onChange({ ...newTrip, endDate: e.target.value })}
          placeholder="End Date"
          min={minDate} // Set the minimum date to today
          max={maxDate} // Set the maximum date to the next 15 days
          className="mx-5 px-2 border border-gray-300 py-2 mb-2 text-gray-500"
          required
        />
        <div className="mt-16 flex gap-4 px-4 py-4 justify-end border-t border-t-gray-200">
          <button
            className="border border-gray-300 px-5 py-1"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 px-5 py-1 text-white rounded-sm"
            onClick={onAddTrip}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
