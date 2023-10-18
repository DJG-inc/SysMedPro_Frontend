import React, { useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    console.log("hovering");
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const navigate = useNavigate();

  return (
    <div className="outer">
      {/* Make the hover activate the nav */}
      <div className="prod-logo" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <img src="https://github.com/abhinanduN/codepen/blob/master/prod.png?raw=true" className="prod-img" alt="icon" />
        <ul className={`main-nav ${isHovering ? "nav-visible" : ""}`}>
          Menu
          <li className="nav-li">
            <a href="./index.html">Home</a>
          </li>
          <li className="nav-li">
            <a onClick={() => navigate("/about")} >About</a>
          </li>
          <li className="nav-li">
            <a onClick={() => navigate("/auth")} >Login</a>
          </li>
          <li className="nav-li">
            <a onClick={() => navigate("/contact")} >Contact</a>
          </li>
        </ul>
      </div>
      <div className="inner">
        <div className="prod-left">
          <h1 className="prod-head">
            <span style={{ color: "#0f457f" }}>PATIENT</span> HUB!
          </h1>
          <h4 className="prod-head-sub">
            "Simplifica la administración de usuarios en tu hospital y mejora la atención médica"
          </h4>
        </div>
        <div className="prod-right">
          <img src="https://github.com/abhinanduN/codepen/blob/master/human-image.png?raw=true" className="prod-human-img" alt="prod" />
        </div>
      </div>
    </div>
  );
}

export default Home;