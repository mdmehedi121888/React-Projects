import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ImageSlider() {
  const [data, setData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const data = await fetch("https://dummyjson.com/products");
      const response = await data.json();
      setData(response.products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleLeftArrow = () => {
    if (currentSlide === 0) setCurrentSlide(9);
    else setCurrentSlide(currentSlide - 1);
  };

  const handleRightArrow = () => {
    if (currentSlide === 9) setCurrentSlide(0);
    else setCurrentSlide(currentSlide + 1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        position: "relative",
      }}
    >
      {data && data.length > 0 && (
        <>
          {loading ? (
            <p style={{ fontSize: "1.2rem", color: "#555" }}>
              Please wait, product is loading...
            </p>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px",
                position: "relative",
              }}
            >
              <FaArrowLeft
                onClick={handleLeftArrow}
                size={40}
                style={{
                  cursor: "pointer",
                  opacity: 0.7,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
              />

              <img
                src={data[currentSlide]?.thumbnail}
                alt="Product"
                style={{
                  width: "400px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  border: "3px solid cyan",
                }}
              />

              <FaArrowRight
                onClick={handleRightArrow}
                size={40}
                style={{
                  cursor: "pointer",
                  opacity: 0.7,
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 0.7)}
              />
            </div>
          )}

          {/* Pagination Dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              gap: "10px",
            }}
          >
            {[...Array(10)].map((_, ind) => (
              <div
                key={ind}
                onClick={() => setCurrentSlide(ind)}
                style={{
                  height: "12px",
                  width: "12px",
                  borderRadius: "50%",
                  backgroundColor:
                    currentSlide === ind ? "cyan" : "transparent",
                  border: "2px solid cyan",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
