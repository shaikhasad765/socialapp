import React from "react";
import { PROTECTED } from "lib/routes";
import { Link } from "react-router-dom";
import "./CSS/Avatar.css"; // Import your external CSS file here

export default function Avatar({ user, size = "xl", overrideAvatar = null }) {
  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: "50%",
    objectFit: "cover",
    cursor: "pointer",
    opacity: "0.8",
  };

  return (
    <Link to={`${PROTECTED}/profile/${user.id}`} className="avatar-link">
      <img
        src={overrideAvatar || user.avatar}
        alt={user.username}
        style={avatarStyle}
        className="avatar-image"
      />
    </Link>
  );
}
