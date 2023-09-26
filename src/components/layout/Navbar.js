import React from "react";
import { DASHBOARD } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "hooks/auth";
import "./CSS/Navbar.css"; 
import icon from "../../Images/social.png"

export default function Navbar() {
  const { logout, isLoading } = useLogout();

  return (
    <div className="navbar-container">
      <div className="navbar-inner">
        <img src={icon} alt="social"/>
        <RouterLink to={DASHBOARD} className="navbar-link">
          Home
        </RouterLink>
      </div>
      <div className="button-container">
        <button
          className={`logout-button ${isLoading ? "loading" : ""}`}
          onClick={logout}
        >
          {isLoading ? "Logging Out" : "Logout"}
        </button>
      </div>
    </div>
  );
}

