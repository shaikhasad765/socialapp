// Imports
import React from "react";
import Avatar from "components/profile/Avatar";
import { useAuth } from "hooks/auth";
import { useAddComment } from "hooks/comments";
import { useForm } from "react-hook-form";
import "./CSS/NewComment.css";

export default function NewComment({ post }) {
  // Extract the 'id' property from the 'post' object
  const { id: postID } = post;

  // Fetch authenticated user data using 'useAuth' hook
  const { user, isLoading: authLoading } = useAuth();

  // Initialize the form and get access to form methods
  const { register, handleSubmit, reset } = useForm();

  // Fetch the 'addComment' function and loading state using 'useAddComment' hook
  const { addComment, isLoading: commentLoading } = useAddComment({
    postID,
    uid: user?.id,
  });

  // Define a function to handle the addition of a new comment
  function handleAddComment(data) {
    // Call the 'addComment' function with the comment text and reset the form
    addComment(data.text);
    reset();
  }

  // Render a loading message while fetching user data
  if (authLoading) return "Loading...";

  return (
    <div className="new-comment-container">
      <div className="new-comment-header">
        {/* Display the user's avatar */}
        <Avatar user={user} size="sm" />
        <div className="new-comment-form">
          <form onSubmit={handleSubmit(handleAddComment)}>
            <div className="new-comment-input">
              {/* Input field for entering a new comment */}
              <input
                type="text"
                size="sm"
                placeholder="Write comment..."
                autoComplete="off"
                {...register("text", { required: true })}
              />
            </div>
            <div className="new-comment-button">
              {/* Submit button for adding a new comment */}
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
