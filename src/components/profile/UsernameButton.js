import React from "react";
import { PROTECTED } from "lib/routes";
import { Link } from "react-router-dom";
import "./CSS/UsernameButton.css"; // Import your external CSS file here

export default function UsernameButton({ user }) {
  return (
    <Link to={`${PROTECTED}/profile/${user.id}`} className="username-link">
      {user.username}
    </Link>
  );
}
