import React from "react";
import Avatar from "components/profile/Avatar";
import { useUser } from "hooks/users";
import { formatDistanceToNow } from "date-fns";
import UsernameButton from "components/profile/UsernameButton";
import "./CSS/Header.css";

export default function Header({ post }) {
  const { uid, date } = post;
  const { user, isLoading } = useUser(uid);

  if (isLoading) return "Loading...";

  return (
    <div className="header-container">
      <Avatar user={user} size="md" />

      <div className="header-content">
        <UsernameButton user={user} />
        <p className="header-date">{formatDistanceToNow(date)} ago</p>
      </div>
    </div>
  );
}
