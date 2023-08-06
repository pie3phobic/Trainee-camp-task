import React from "react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";
import styles from "../styles/Controls.module.css";
type ControlsProps = {
  containerRef: React.RefObject<HTMLElement>;
  scrollLeft: (containerRef: React.RefObject<HTMLElement>) => void;
  scrollRight: (containerRef: React.RefObject<HTMLElement>) => void;
};

const Controls: React.FC<ControlsProps> = ({
  scrollLeft,
  scrollRight,
  containerRef,
}) => {
  return (
    <div className={styles.div}>
      <ArrowNarrowLeftIcon
        className="h-6 hover:scale-110 hover:bg-slate-200 rounded-md px-2 transition-transform ease-in-out duration-200"
        onClick={() => scrollLeft(containerRef)}
      />
      <ArrowNarrowRightIcon
        className="h-6 hover:scale-110 hover:bg-slate-200 rounded-md px-2 transition-transform ease-in-out duration-200"
        onClick={() => scrollRight(containerRef)}
      />
    </div>
  );
};

export default Controls;
