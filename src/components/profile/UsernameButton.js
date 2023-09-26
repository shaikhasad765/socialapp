// Imports
import React from "react";
import { PROTECTED } from "lib/routes";
import { Link } from "react-router-dom";
import "./CSS/UsernameButton.css"; 

export default function UsernameButton({ user }) {
  return (
    // Create a link to the user's profile page
    <Link to={`${PROTECTED}/profile/${user.id}`} className="username-link">
      {/* Display the user's username */}
      {user.username}
    </Link>
  );
}
