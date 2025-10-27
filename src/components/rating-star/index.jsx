import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function RatingStar() {
  const [hoverIndex, setHoverIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnclick = (index) => {
    setActiveIndex(index);
  };

  const handleOnMouseLeave = () => {
    setHoverIndex(0);
  };

  const handleOnMouseMove = (index) => {
    setHoverIndex(index);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        gap: "5px",
      }}
    >
      {[...Array(10)].map((_, index) => {
        index += 1;
        return (
          <FaStar
            key={index}
            onClick={() => handleOnclick(index)}
            onMouseLeave={() => handleOnMouseLeave()}
            onMouseMove={() => handleOnMouseMove(index)}
            style={{
              color: (hoverIndex || activeIndex) >= index ? "gold" : "#CCC",
            }}
            size={40}
          />
        );
      })}
    </div>
  );
}
