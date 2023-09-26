// Imports
import PostsLists from "components/post/PostsList";
import React from "react";
import { useAuth } from "hooks/auth";
import { useAddPost, usePosts } from "hooks/posts";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import "./index.css";

function NewPost() {
  // Initialize the form and get access to form methods
  const { register, handleSubmit, reset } = useForm();

  // Fetch the 'addPost' function and loading state using 'useAddPost' hook
  const { addPost, isLoading: addingPost } = useAddPost();

  // Fetch authenticated user data using 'useAuth' hook
  const { user, isLoading: authLoading } = useAuth();

  // Define a function to handle the addition of a new post
  function handleAddPost(data) {
    // Call the 'addPost' function with the user ID and post text, then reset the form
    addPost({
      uid: user.id,
      text: data.text,
    });
    reset();
  }

  return (
    <div className="new-post-container">
      <form onSubmit={handleSubmit(handleAddPost)}>
        <div className="form-header">
          <h1>New Post</h1>
          <button
            className={`post-button ${authLoading || addingPost ? "loading" : ""}`}
            type="submit"
          >
            {/* Display "Loading" or "Post" based on loading states */}
            {authLoading || addingPost ? "Loading" : "Post"}
          </button>
        </div>
        <TextareaAutosize
          className="textarea"
          placeholder="Create a new post..."
          minRows={3}
          {...register("text", { required: true })}
        />
      </form>
    </div>
  );
}

function Dashboard() {
  // Fetch the list of posts using 'usePosts' hook
  const { posts, isLoading } = usePosts();

  // Render a loading message while fetching posts
  if (isLoading) return "Loading posts...";

  return (
    <>
      {/* Render the 'NewPost' component to create new posts */}
      <NewPost />

      {/* Render the list of posts using the 'PostsLists' component */}
      <PostsLists posts={posts} />
    </>
  );
}

export default Dashboard;
