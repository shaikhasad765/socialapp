import React from "react";
import { useAuth } from "hooks/auth";
import { PROTECTED, USERS } from "lib/routes";
import { Link } from "react-router-dom";
import Avatar from "components/profile/Avatar";
import "./CSS/Sidebar.css"; 

function ActiveUser() {
  const { user, isLoading } = useAuth();

  if (isLoading) return "Loading...";

  return (
    <div className="active-user-container">
      <Avatar user={user} />
      <div className="code">@{user.username}</div>
      <Link
        to={`${PROTECTED}/profile/${user.id}`}
        className="edit-profile-button"
      >
        Edit Profile
      </Link>
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <ActiveUser />
      <div className="sidebar-content">
        <div className="user-list-divider" />
        <Link to={USERS} className="all-users-button">
          ALL USERS
        </Link>
      </div>
    </div>
  );
}
