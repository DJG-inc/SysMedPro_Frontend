import React from "react";
import "./Header.css";  

export const Header = ({handleLogout}) => {
  return (
    <header className="storybook-header">
      <div className="header-logo">
        <img src="https://github.com/abhinanduN/codepen/blob/master/prod.png?raw=true" alt="Logo" />
      </div>
      <div className="header-logout-btn">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};
