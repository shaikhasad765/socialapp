
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
import "./CSS/Actions.css"; // Import your external CSS file here

export default function Actions({ post }) {
  const { id, likes, uid } = post;
  const { user, isLoading: userLoading } = useAuth();

  const isLiked = likes.includes(user?.id);
  const config = {
    id,
    isLiked,
    uid: user?.id,
  };

  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);
  const { comments, isLoading: commentsLoading } = useComments(id);

  return (
    <div className="actions-container">
      <div className="action-item">
        <button
          onClick={toggleLike}
          className={`like-button ${likeLoading || userLoading ? "loading" : ""}`}
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <span className="like-count">{likes.length}</span>
      </div>
      <div className="action-item">
        <Link
          to={`${PROTECTED}/comments/${id}`}
          className={`comment-button ${commentsLoading ? "loading" : ""}`}
        >
          {comments?.length === 0 ? <FaRegComment /> : <FaComment />}
        </Link>
        <span className="comment-count">{comments?.length}</span>
      </div>

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
