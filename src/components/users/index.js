import React from "react";
import { useUsers } from "hooks/users";
import User from "./User";
import "./index.css"; 

export default function Users() {
  const { users, isLoading } = useUsers();

  if (isLoading) return "Loading...";

  return (
    <div className="users-container">
      {users?.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
