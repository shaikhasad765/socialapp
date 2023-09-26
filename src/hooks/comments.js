// Imports
import { uuidv4 } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "lib/firebase";
import { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom hook for adding comments to a post
export function useAddComment({ postID, uid }) {
  // State to track loading state
  const [isLoading, setLoading] = useState(false);

  // Function to add a new comment
  async function addComment(text) {
    setLoading(true);
    const id = uuidv4(); // Generate a unique comment ID
    const date = Date.now(); // Get the current timestamp
    const docRef = doc(db, "comments", id); // Create a reference to the comment document
    await setDoc(docRef, { text, id, postID, date, uid }); // Set comment data in Firestore

    // Display a success notification
    toast.success("Comment added!", { position: "top-right", autoClose: 5000 });

    setLoading(false); // Set loading state to false
  }

  // Return the addComment function and loading state
  return { addComment, isLoading };
}

// Custom hook for fetching comments for a specific post
export function useComments(postID) {
  // Construct a Firestore query to get comments for the specified post
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID), // Filter comments by postID
    orderBy("date", "asc") // Order comments by date in ascending order
  );

  // Use the useCollectionData hook to fetch and return comments based on the query
  const [comments, isLoading, error] = useCollectionData(q);

  if (error) throw error; // Handle any errors

  // Return the fetched comments and loading state
  return { comments, isLoading };
}

// Custom hook for deleting a comment
export function useDeleteComment(id) {
  // State to track loading state
  const [isLoading, setLoading] = useState(false);

  // Function to delete a comment
  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?"); // Display a confirmation dialog

    if (res) {
      setLoading(true);
      const docRef = doc(db, "comments", id); // Create a reference to the comment document
      await deleteDoc(docRef); // Delete the comment document from Firestore

      // Display a notification to inform the user that the comment has been deleted
      toast.info("Comment deleted!", { position: "top-right", autoClose: 5000 });

      setLoading(false); // Set loading state to false
    }
  }

  // Return the deleteComment function and loading state
  return { deleteComment, isLoading };
}
