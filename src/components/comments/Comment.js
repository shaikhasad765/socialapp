// Imports
import React from "react";
import Avatar from "components/profile/Avatar";
import UsernameButton from "components/profile/UsernameButton";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "hooks/auth";
import { useDeleteComment } from "hooks/comments";
import { useUser } from "hooks/users";
import { FaTrash } from "react-icons/fa";
import "./CSS/Comment.css";

export default function Comment({ comment }) {
  // Extract properties from the 'comment' object
  const { text, uid, date, id } = comment;

  // Fetch user data for the comment author using 'useUser' hook
  const { user, isLoading: userLoading } = useUser(uid);

  // Fetch authenticated user data using 'useAuth' hook
  const { user: authUser, isLoading: authLoading } = useAuth();

  // Fetch the 'deleteComment' function and loading state using 'useDeleteComment' hook
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id);

  // Render a loading message while fetching user data
  if (userLoading) return "Loading...";

  return (
    <div className="comment-container">
      <div className="comment-header">
        {/* Display the user's avatar */}
        <Avatar user={user} size="sm" />
        <div className="comment-details">
          <div className="comment-username">
            {/* Display the user's username as a clickable button */}
            <UsernameButton user={user} />
          </div>
          <div className="comment-time">
            {/* Display the time since the comment was posted */}
            <span>{formatDistanceToNow(date)} ago</span>
          </div>
          {/* Display a delete button for the comment if the authenticated user is the comment author */}
          {!authLoading && authUser.id === uid && (
            <button
              className="comment-delete-button"
              onClick={deleteComment}
              disabled={deleteLoading}
            >
              <FaTrash className="comment-delete-icon" />
              &ensp;Delete Comment
            </button>
          )}
        </div>
      </div>
      <div className="comment-text">
        {/* Display the comment text */}
        <p>{text}</p>
      </div>
    </div>
  );
}
