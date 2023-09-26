// Imports
import React from "react";
import Header from "./Header";
import Actions from "./Actions";
import "./CSS/index.css"; 

export default function Post({ post }) {
  // Extract the 'text' property from the 'post' object
  const { text } = post;

  return (
    <div className="post-container">
      <div className="post-content">
        {/* Render the post header using the 'Header' component */}
        <Header post={post} />

        <div className="post-text">
          {/* Display the post text */}
          <p>{text}</p>
        </div>

        {/* Render post actions (likes, comments, and delete) using the 'Actions' component */}
        <Actions post={post} />
      </div>
    </div>
  );
}
