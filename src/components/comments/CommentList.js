// Imports
import React from "react";
import Comment from "./Comment";
import "./CSS/CommentList.css";
import { useComments } from "hooks/comments";

export default function CommentList({ post }) {
  // Extract the 'id' property from the 'post' object
  const { id } = post;

  // Fetch comments related to the current post using the 'useComments' hook
  const { comments, isLoading } = useComments(id);

  // Render a loading message while fetching comments
  if (isLoading) return "Loading...";

  return (
    <div className="comment-list-container">
      {/* Map through the 'comments' array and render each comment using the 'Comment' component */}
      {comments.map((comment) => (
        // Pass each 'comment' object as a prop to the 'Comment' component
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
