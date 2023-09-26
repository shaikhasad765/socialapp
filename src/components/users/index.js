// Imports
import React from "react";
import { useUsers } from "hooks/users";
import User from "./User";
import "./index.css"; 

export default function Users() {
  // Fetch the list of users and loading state using 'useUsers' hook
  const { users, isLoading } = useUsers();

  // Render a loading message while fetching user data
  if (isLoading) return "Loading...";

  return (
    <div className="users-container">
      {/* Map through the list of users and render each using the 'User' component */}
      {users?.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
