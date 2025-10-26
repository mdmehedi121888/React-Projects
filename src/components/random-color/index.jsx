import { useState } from "react";
import "./style.css";
export default function RandomColorGenarator() {
  const [bgColor, setBGColor] = useState("#FFFFFF");

  const randomValue = (limit) => Math.floor(Math.random() * limit);

  const generateHexColor = () => {
    const hexValues = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; ++i) {
      color += hexValues[randomValue(15)];
    }
    return color;
  };

  const generateRgbColor = () => {
    const r = randomValue(255);
    const g = randomValue(255);
    const b = randomValue(255);
    return `rgb(${r},${g},${b})`;
  };

  const handleGenerateColor = (type) => {
    const newColor = type === "hex" ? generateHexColor() : generateRgbColor();
    setBGColor(newColor);
  };

  return (
    <div className="random-color-section" style={{ backgroundColor: bgColor }}>
      <div className="button-section">
        <button onClick={() => handleGenerateColor("hex")}>
          HEX Color Generate
        </button>
        <button onClick={() => handleGenerateColor("rgb")}>
          RGB Color Generate
        </button>
      </div>

      <div>
        <h1 style={{ textAlign: "center", color: "white" }}>
          Background Color: {bgColor}
        </h1>
      </div>
    </div>
  );
}
