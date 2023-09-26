// Imports
import React from "react";
import { useAuth } from "hooks/auth";
import { PROTECTED, USERS } from "lib/routes";
import { Link } from "react-router-dom";
import Avatar from "components/profile/Avatar";
import "./CSS/Sidebar.css";

// Component to display the active user's information
function ActiveUser() {
  // Fetch authenticated user data using 'useAuth' hook
  const { user, isLoading } = useAuth();

  // Render a loading message while fetching user data
  if (isLoading) return "Loading...";

  return (
    <div className="active-user-container">
      {/* Display the user's avatar */}
      <Avatar user={user} />
      <div className="code">@{user.username}</div>

      {/* Create a link to edit the user's profile */}
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
      {/* Render the 'ActiveUser' component to display the active user */}
      <ActiveUser />

      <div className="sidebar-content">
        {/* Create a divider */}
        <div className="user-list-divider" />

        {/* Create a link to view all users */}
        <Link to={USERS} className="all-users-button">
          ALL USERS
        </Link>
      </div>
    </div>
  );
}
