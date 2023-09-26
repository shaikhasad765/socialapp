import React from "react";
import Comment from "./Comment";
import "./CSS/CommentList.css"; 
import { useComments } from "hooks/comments";

export default function CommentList({ post }) {
  const { id } = post;
  const { comments, isLoading } = useComments(id);

  if (isLoading) return "Loading...";

  return (
    <div className="comment-list-container"> 
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
