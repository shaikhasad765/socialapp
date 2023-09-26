// Imports
import React from "react";
import Avatar from "components/profile/Avatar";
import { useUser } from "hooks/users";
import { formatDistanceToNow } from "date-fns";
import UsernameButton from "components/profile/UsernameButton";
import "./CSS/Header.css";

export default function Header({ post }) {
  // Extract properties from the 'post' object
  const { uid, date } = post;

  // Fetch user data based on the 'uid' using 'useUser' hook
  const { user, isLoading } = useUser(uid);

  // Render a loading message while fetching user data
  if (isLoading) return "Loading...";

  return (
    <div className="header-container">
      {/* Display the user's avatar with medium size */}
      <Avatar user={user} size="md" />

      <div className="header-content">
        {/* Display the username and link to user's profile */}
        <UsernameButton user={user} />

        {/* Display the post's date in a relative format */}
        <p className="header-date">{formatDistanceToNow(date)} ago</p>
      </div>
    </div>
  );
}
