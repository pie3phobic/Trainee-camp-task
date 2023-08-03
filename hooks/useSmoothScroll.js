import { useRef } from "react";

const useSmoothScroll = () => {
  const scrollStep = 400; // Adjust the value as needed

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref) => {
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
