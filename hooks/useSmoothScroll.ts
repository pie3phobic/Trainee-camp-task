import { useRef } from "react";

interface SmoothScrollFunctions {
  scrollLeft: (ref: React.RefObject<HTMLElement>) => void;
  scrollRight: (ref: React.RefObject<HTMLElement>) => void;
}

const useSmoothScroll = (): SmoothScrollFunctions => {
  const scrollStep = 400;

  const scrollLeft = (ref: React.RefObject<HTMLElement>): void => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref: React.RefObject<HTMLElement>): void => {
    if (ref.current) {
      ref.current.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
    }
  };

  return { scrollLeft, scrollRight };
};

export default useSmoothScroll;
