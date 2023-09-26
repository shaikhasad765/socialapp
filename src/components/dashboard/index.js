import PostsLists from "components/post/PostsList";
import React from "react";
import { useAuth } from "hooks/auth";
import { useAddPost, usePosts } from "hooks/posts";
import { useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import "./index.css"; 

function NewPost() {
  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading: addingPost } = useAddPost();
  const { user, isLoading: authLoading } = useAuth();

  function handleAddPost(data) {
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
            {authLoading || addingPost ? "Loading" : "Post"}
          </button>
        </div>
        <TextareaAutosize
          className="textarea" // Use className instead of class for JSX
          placeholder="Create a new post..."
          minRows={3}
          {...register("text", { required: true })}
        />
      </form>
    </div>
  );
}

function Dashboard() {
  const { posts, isLoading } = usePosts();

  if (isLoading) return "Loading posts...";

  return (
    <>
      <NewPost />
      <PostsLists posts={posts} />
    </>
  );
}

export default Dashboard;
