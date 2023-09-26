import React from "react";
import Avatar from "components/profile/Avatar";
import UsernameButton from "components/profile/UsernameButton";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "hooks/auth";
import { useDeleteComment } from "hooks/comments";
import { useUser } from "hooks/users";
import { FaTrash } from "react-icons/fa";
import "./CSS/Comment.css"; // Import your external CSS file here

export default function Comment({ comment }) {
  const { text, uid, date, id } = comment;
  const { user, isLoading: userLoading } = useUser(uid);
  const { user: authUser, isLoading: authLoading } = useAuth();
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id);

  if (userLoading) return "Loading...";

  return (
    <div className="comment-container">
      <div className="comment-header">
        <Avatar user={user} size="sm" />
        <div className="comment-details">
          <div className="comment-username">
            <UsernameButton user={user} />
          </div>
          <div className="comment-time">
            <span>{formatDistanceToNow(date)} ago</span>
          </div>
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
        <p>{text}</p>
      </div>
    </div>
  );
}
