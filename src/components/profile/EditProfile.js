// Imports
import React from "react";
import { useAuth } from "hooks/auth";
import { useUpdateAvatar } from "hooks/users";
import Avatar from "./Avatar";
import "./CSS/EditProfile.css";

export default function EditProfile({ isOpen, onClose }) {
  // Fetch authenticated user data using 'useAuth' hook
  const { user, isLoading: authLoading } = useAuth();

  // Fetch functions and data for updating the user's avatar using 'useUpdateAvatar' hook
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id);

  // Function to handle file input change
  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  // Render a loading message while fetching user data
  if (authLoading) return "Loading...";

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Edit profile</h2>
        <span className="modal-close-button" onClick={onClose}></span>
        <div className="modal-body">
          <div className="edit-profile-container">
            {/* Display the user's avatar with the option to change it */}
            <Avatar user={user} overrideAvatar={fileURL} />
            <div className="form-control">
              <label htmlFor="picture">Change avatar</label>
              <input type="file" accept="image/*" onChange={handleChange} />
            </div>
          </div>
          <div className="button-container">
            {/* Button to save changes (upload avatar) */}
            <button
              className={`save-button ${fileLoading ? "loading" : ""}`}
              onClick={updateAvatar}
            >
              {fileLoading ? "Uploading" : "Save"}
            </button>
            {/* Button to cancel and close the modal */}
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}