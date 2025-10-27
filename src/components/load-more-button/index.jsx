import React, { useEffect, useState } from "react";

export default function LoadMoreButton() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=20&skip=${count * 20}`
      );
      const data = await res.json();
      setProducts((prev) => [...prev, ...data.products]);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [count]);

  return (
    <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Products Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "30px",
          justifyItems: "center",
        }}
      >
        {products?.map((product) => (
          <div
            key={product.id}
            style={{
              backgroundColor: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              cursor: "pointer",
              width: "100%",
              maxWidth: "250px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "10px 15px" }}>
              <h5
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  marginBottom: "5px",
                }}
              >
                {product.title}
              </h5>
              <p
                style={{
                  color: "#555",
                  fontSize: "0.9rem",
                  marginBottom: "5px",
                }}
              >
                {product.category}
              </p>
              <p style={{ color: "#0d6efd", fontWeight: "bold" }}>
                ${product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            color: "#0d6efd",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              border: "4px solid #f3f3f3",
              borderTop: "4px solid #0d6efd",
              borderRadius: "50%",
              width: "35px",
              height: "35px",
              margin: "0 auto 10px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
          Loading Products...
        </div>
      )}

      {/* Load More Button */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <button
          disabled={products.length === 80 || loading}
          style={{
            backgroundColor:
              products.length === 80 ? "#ccc" : loading ? "#6c757d" : "#0d6efd",
            color: "white",
            border: "none",
            padding: "12px 28px",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor:
              products.length === 80 || loading ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            boxShadow: "0 3px 6px rgba(0, 0, 0, 0.15)",
            opacity: products.length === 80 ? 0.7 : 1,
          }}
          onClick={() => {
            if (!loading && products.length < 80) setCount(count + 1);
          }}
          onMouseEnter={(e) => {
            if (!loading && products.length < 80)
              e.currentTarget.style.backgroundColor = "#0b5ed7";
          }}
          onMouseLeave={(e) => {
            if (!loading && products.length < 80)
              e.currentTarget.style.backgroundColor = "#0d6efd";
          }}
        >
          {products.length === 80
            ? "All Products Loaded"
            : loading
            ? "Loading..."
            : "Load More"}
        </button>
      </div>

      {/* Spinner Keyframes */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
