import React from "react";
import CustomDropdown from "./CustomDropdown";
import styles from "../styles/Home.module.css";
import { XIcon } from "@heroicons/react/solid";
import { ModalProps } from "../types";
import { formatDate } from "../helpers/formatDate";
const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  newTrip,
  onChange,
  onAddTrip,
}) => {
  if (!isOpen) {
    return null;
  }
  const today = new Date();
  const next15Days = new Date(today);
  next15Days.setDate(next15Days.getDate() + 15);
  // @ts-ignore
  const minDate = formatDate(today);
  // @ts-ignore
  const maxDate = formatDate(next15Days);
  const isSaveDisabled =
    !newTrip.city || !newTrip.startDate || !newTrip.endDate;
  return (
    <div className={styles.modal}>
      <div className={styles.modal_container}>
        <div className={styles.modal_items_container}>
          <p className={styles.modal_label}>Create trip</p>
          <XIcon className={styles.x_icon} onClick={onClose} />
        </div>
        <label htmlFor="city" className={styles.city_label}>
          <span className="text-red-500">* </span>City
        </label>
        <div className="px-5">
          <CustomDropdown
            selectedValue={newTrip.city}
            onChange={(city) => onChange({ ...newTrip, city })}
          />
        </div>
        <label htmlFor="startDate" className={styles.date_input_label}>
          <span className="text-red-500">* </span>Start date
        </label>
        <input
          type="date"
          id="startDate"
          value={newTrip.startDate}
          placeholder="Start Date"
          min={minDate}
          max={maxDate}
          onChange={(e) => onChange({ ...newTrip, startDate: e.target.value })}
          className={styles.date_input}
          required
        />
        <label htmlFor="endDate" className={styles.date_input_label}>
          <span className="text-red-500">* </span>End date
        </label>
        <input
          type="date"
          id="endDate"
          value={newTrip.endDate}
          onChange={(e) => onChange({ ...newTrip, endDate: e.target.value })}
          placeholder="End Date"
          min={minDate}
          max={maxDate}
          className={styles.date_input}
          required
        />
        <div className={styles.button_container}>
          <button className={styles.cancel_button} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.save_button}
            onClick={onAddTrip}
            disabled={isSaveDisabled}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
