// Imports
import React from "react";
import Post from "./index";
import "./CSS/PostList.css";

export default function PostsList({ posts }) {
  return (
    <div className="posts-list-container">
      {/* Check if there are no posts and display a message */}
      {posts?.length === 0 ? (
        <p className="no-posts-message">
          No posts yet... Feeling a little lonely here.
        </p>
      ) : (
        // If there are posts, map through them and render each using the 'Post' component
        posts?.map((post) => <Post key={post.id} post={post} />)
      )}
    </div>
  );
}
