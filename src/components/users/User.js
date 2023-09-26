// Imports
import React from "react";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";
import Avatar from "components/profile/Avatar";
import "./User.css"; 

export default function User({ user }) {
  // Destructure user object to extract id and username
  const { id, username } = user;

  return (
    <div className="user-container">
      {/* Display the user's avatar */}
      <Avatar user={user} />

      {/* Display the username with an '@' symbol */}
      <p className="user-username">@{username}</p>

      {/* Create a link to view the user's profile */}
      <Link to={`${PROTECTED}/profile/${id}`} className="view-profile-link">
        View Profile
      </Link>
    </div>
  );
}