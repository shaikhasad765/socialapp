// Imports
import React from "react";
import { PROTECTED } from "lib/routes";
import { Link } from "react-router-dom";
import "./CSS/Avatar.css";

export default function Avatar({ user, size = "xl", overrideAvatar = null }) {
  // Define the style for the avatar image
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
    opacity: "0.8",
  };

  return (
    // Create a link to the user's profile page
    <Link to={`${PROTECTED}/profile/${user.id}`} className="avatar-link">
      {/* Display the user's avatar image */}
      <img
        src={overrideAvatar || user.avatar}
        alt={user.username}
        style={avatarStyle}
        className="avatar-image"
      />
    </Link>
  );
}
