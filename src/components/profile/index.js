// Imports
import React, { useState } from "react";
import PostsList from "components/post/PostsList";
import { usePosts } from "hooks/posts";
import { useUser } from "hooks/users";
import { useParams } from "react-router-dom";
import Avatar from "./Avatar";
import { format } from "date-fns";
import EditProfile from "./EditProfile";
import { useAuth } from "hooks/auth";
import "./CSS/index.css";

export default function Profile() {
  const { id } = useParams();

  // Fetch user's posts and loading state using 'usePosts' hook
  const { posts, isLoading: postsLoading } = usePosts(id);

  // Fetch user data and loading state using 'useUser' hook
  const { user, isLoading: userLoading } = useUser(id);

  // Fetch authenticated user data and loading state using 'useAuth' hook
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

  // Render a loading message while fetching user data
  if (userLoading) return "Loading...";

  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* Display the user's avatar with an option to change it */}
        <Avatar size="2xl" user={user} />

        {/* Display the "Change avatar" button for the authenticated user */}
        {!authLoading && authUser.id === user.id && (
          <button
            className="change-avatar-button"
            onClick={openModal}
          >
            Change avatar
          </button>
        )}

        <div className="profile-details">
          {/* Display the user's username */}
          <h2>{user.username}</h2>

          {/* Display user statistics */}
          <div className="profile-stats">
            <p>Posts: {posts.length}</p>
            <p>&emsp;Likes: todo!</p>
            <p>&emsp;Joined: {format(user.date, "MMMM YYY")}</p>
          </div>
        </div>

        {/* Render the 'EditProfile' modal when 'isModalOpen' is true */}
        {isModalOpen && (
          <EditProfile isOpen={isModalOpen} onClose={closeModal} />
        )}
      </div>

      {postsLoading ? (
        <p>Posts are loading...</p>
      ) : (
        // Display the user's posts using the 'PostsList' component
        <PostsList posts={posts} />
      )}
    </div>
  );
}
