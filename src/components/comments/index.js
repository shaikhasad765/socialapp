// Imports
import React from "react";
import Post from "components/post";
import NewComment from "./NewComment";
import CommentList from "./CommentList";
import "./CSS/index.css";
import { usePost } from "hooks/posts";
import { useParams } from "react-router-dom";

export default function Comments() {
  // Extract the 'id' parameter from the URL using 'useParams' from 'react-router-dom'
  const { id } = useParams();

  // Fetch the post data based on the 'id' parameter using the 'usePost' hook
  const { post, isLoading } = usePost(id);

  // Render a loading message while fetching the post data
  if (isLoading) return "Loading...";

  return (
    <div className="comments-container">
      {/* Render the post details using the 'Post' component */}
      <Post post={post} />

      {/* Render a form to add a new comment using the 'NewComment' component */}
      <NewComment post={post} />

      {/* Render the list of comments for the post using the 'CommentList' component */}
      <CommentList post={post} />
    </div>
  );
}
