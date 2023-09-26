import React from "react";
import Post from "./index";
import "./CSS/PostList.css"; // Import your external CSS file here

export default function PostsList({ posts }) {
  return (
    <div className="posts-list-container">
        {posts?.length === 0 ? (
          <p className="no-posts-message">
            No posts yet... Feeling a little lonely here.
          </p>
        ) : (
          posts?.map((post) => <Post key={post.id} post={post} />)
        )}
    </div>
  );
}
