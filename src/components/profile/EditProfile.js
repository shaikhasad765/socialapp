import React from "react";
import { useAuth } from "hooks/auth";
import { useUpdateAvatar } from "hooks/users";
import Avatar from "./Avatar";
import "./CSS/EditProfile.css"; // Import your external CSS file here

export default function EditProfile({ isOpen, onClose }) {
  const { user, isLoading: authLoading } = useAuth();
  const {
    setFile,
    updateAvatar,
    isLoading: fileLoading,
    fileURL,
  } = useUpdateAvatar(user?.id);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  if (authLoading) return "Loading...";

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>Edit profile</h2>
        <span className="modal-close-button" onClick={onClose}></span>
        <div className="modal-body">
          <div className="edit-profile-container">
            <Avatar user={user} overrideAvatar={fileURL} />
            <div className="form-control">
              <label htmlFor="picture">Change avatar</label>
              <input type="file" accept="image/*" onChange={handleChange}/>
            </div>
          </div>
          <div className="button-container">
            <button
              className={`save-button ${fileLoading ? "loading" : ""}`}
              onClick={updateAvatar}
            >
              {fileLoading ? "Uploading" : "Save"}
            </button>
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
