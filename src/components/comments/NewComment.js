import React from "react";
import Avatar from "components/profile/Avatar";
import { useAuth } from "hooks/auth";
import { useAddComment } from "hooks/comments";
import { useForm } from "react-hook-form";
import "./CSS/NewComment.css"; // Import your external CSS file here

export default function NewComment({ post }) {
  const { id: postID } = post;
  const { user, isLoading: authLoading } = useAuth();
  const { register, handleSubmit, reset } = useForm();
  const { addComment, isLoading: commentLoading } = useAddComment({
    postID,
    uid: user?.id,
  });

  function handleAddComment(data) {
    addComment(data.text);
    reset();
  }

  if (authLoading) return "Loading...";

  return (
    <div className="new-comment-container"> {/* Apply external CSS class */}
      <div className="new-comment-header">
        <Avatar user={user} size="sm" />
        <div className="new-comment-form">
          <form onSubmit={handleSubmit(handleAddComment)}>
            <div className="new-comment-input">
              <input
                type="text"
                size="sm"
                placeholder="Write comment..."
                autoComplete="off"
                {...register("text", { required: true })}
              />
            </div>
            <div className="new-comment-button">
              <button
                type="submit"
                disabled={commentLoading || authLoading}
                className="add-comment-button"
              >
                Add Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
