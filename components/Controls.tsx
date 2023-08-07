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
        className={styles.arrow}
        onClick={() => scrollLeft(containerRef)}
      />
      <ArrowNarrowRightIcon
        className={styles.arrow}
        onClick={() => scrollRight(containerRef)}
      />
    </div>
  );
};

export default Controls;
