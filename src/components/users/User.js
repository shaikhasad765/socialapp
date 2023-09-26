import React from "react";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";
import Avatar from "components/profile/Avatar";
import "./User.css"; 

export default function User({ user }) {
  const { id, username } = user;

  return (
    <div className="user-container">
      <Avatar user={user} />
      <p className="user-username">@{username}</p>
      <Link to={`${PROTECTED}/profile/${id}`} className="view-profile-link">
        View Profile
      </Link>
    </div>
  );
}
