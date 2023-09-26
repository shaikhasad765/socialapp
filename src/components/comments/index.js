import React from "react";
import Post from "components/post";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import "./CSS/index.css"; 
import { usePost } from "hooks/posts";
import { useParams } from "react-router-dom";

export default function Comments() {
  const { id } = useParams();
  const { post, isLoading } = usePost(id);

  if (isLoading) return "Loading...";

  return (
    <div className="comments-container"> 
      <Post post={post} />
      <NewComment post={post} />
      <CommentList post={post} />
    </div>
  );
}
