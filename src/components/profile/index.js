import React, { useState } from "react";
import PostsList from "components/post/PostsList";
import { usePosts } from "hooks/posts";
import { useUser } from "hooks/users";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { format } from "date-fns";
import EditProfile from "./EditProfile";
import { useAuth } from "hooks/auth";
import "./CSS/index.css"; // Import your external CSS file here

export default function Profile() {
  const { id } = useParams();
  const { posts, isLoading: postsLoading } = usePosts(id);
  const { user, isLoading: userLoading } = useUser(id);
  const { user: authUser, isLoading: authLoading } = useAuth();

  // State to manage the modal open/close state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (userLoading) return "Loading...";

  return (
    <div className="profile-container">
      <div className="profile-header">
        <Avatar size="2xl" user={user} />

        {!authLoading && authUser.id === user.id && (
          <button
            className="change-avatar-button"
            onClick={openModal}
          >
            Change avatar
          </button>
        )}

        <div className="profile-details">
          <h2>{user.username}</h2>
          <div className="profile-stats">
            <p>Posts: {posts.length}</p>
            <p>&emsp;Likes: todo!</p>
            <p>&emsp;Joined: {format(user.date, "MMMM YYY")}</p>
          </div>
        </div>

        {isModalOpen && (
          <EditProfile isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>

      {postsLoading ? (
        <p>Posts are loading...</p>
      ) : (
        <PostsList posts={posts} />
      )}
    </div>
  );
}
