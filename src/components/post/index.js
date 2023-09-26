import React from "react";
import Header from "./Header";
import Actions from "./Actions";
import "./CSS/index.css"; // Import your external CSS file here

export default function Post({ post }) {
  const { text } = post;

  return (
    <div className="post-container">
      <div className="post-content">
        <Header post={post} />
        <div className="post-text">
          <p>{text}</p>
        </div>
        <Actions post={post} />
      </div>
    </div>
  );
}
