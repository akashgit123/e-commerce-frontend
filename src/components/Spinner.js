import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Spinner() {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((pre) => pre - 1);
    }, 1000);
    count === 0 && navigate("/login", { state: location.pathname });
    return () => clearInterval(timer);
  }, [count, navigate, location]);
  return (
    <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h2>Redirecting you in {count} seconds...</h2>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
}

export default Spinner;
