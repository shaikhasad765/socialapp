// Imports
import React from "react";
import { DASHBOARD } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "hooks/auth";
import "./CSS/Navbar.css";
import icon from "../../Images/social.png";

export default function Navbar() {
  // Fetch the 'logout' function and loading state using 'useLogout' hook
  const { logout, isLoading } = useLogout();

  return (
    <div className="navbar-container">
      <div className="navbar-inner">
        {/* Display the social media icon */}
        <img src={icon} alt="social" />

        {/* Create a link to the dashboard */}
        <RouterLink to={DASHBOARD} className="navbar-link">
          Home
        </RouterLink>
      </div>

      <div className="button-container">
        {/* Create a button for logout, with loading state */}
        <button
          className={`logout-button ${isLoading ? "loading" : ""}`}
          onClick={logout}
        >
          {/* Display "Logging Out" or "Logout" based on loading state */}
          {isLoading ? "Logging Out" : "Logout"}
        </button>
      </div>
    </div>
  );
}
