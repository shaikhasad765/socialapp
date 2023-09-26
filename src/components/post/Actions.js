// Imports
import React from "react";
import {
  FaRegHeart,
  FaHeart,
  FaComment,
  FaRegComment,
  FaTrash,
} from "react-icons/fa";
import { useToggleLike, useDeletePost } from "hooks/posts";
import { useAuth } from "hooks/auth";
import { Link } from "react-router-dom";
import { PROTECTED } from "lib/routes";
import { useComments } from "hooks/comments";
import "./CSS/Actions.css"; 

export default function Actions({ post }) {
  // Extract properties from the 'post' object
  const { id, likes, uid } = post;

  // Fetch authenticated user data using 'useAuth' hook
  const { user, isLoading: userLoading } = useAuth();

  // Check if the post is liked by the authenticated user
  const isLiked = likes.includes(user?.id);

  // Configuration object for 'useToggleLike' hook
  const config = {
    id,
    isLiked,
    uid: user?.id,
  };

  // Fetch the 'toggleLike' function and loading state using 'useToggleLike' hook
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);

  // Fetch the 'deletePost' function and loading state using 'useDeletePost' hook
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);

  // Fetch comments related to the current post using 'useComments' hook
  const { comments, isLoading: commentsLoading } = useComments(id);

  return (
    <div className="actions-container">
      <div className="action-item">
        {/* Button to toggle liking the post */}
        <button
          onClick={toggleLike}
          className={`like-button ${likeLoading || userLoading ? "loading" : ""}`}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <span className="like-count">{likes.length}</span>
      </div>
      <div className="action-item">
        {/* Link to view post comments */}
        <Link
          to={`${PROTECTED}/comments/${id}`}
          className={`comment-button ${commentsLoading ? "loading" : ""}`}
        >
          {comments?.length === 0 ? <FaRegComment /> : <FaComment />}
        </Link>
        <span className="comment-count">{comments?.length}</span>
      </div>

      {/* Display delete button if the authenticated user is the post author */}
      {!userLoading && user.id === uid && (
        <button
          onClick={deletePost}
          className={`delete-button ${deleteLoading ? "loading" : ""}`}
        >
          <FaTrash />
        </button>
      )}
    </div>
  );
}
