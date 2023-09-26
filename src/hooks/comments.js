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

export function useAddComment({ postID, uid }) {
  const [isLoading, setLoading] = useState(false);

  async function addComment(text) {
    setLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, { text, id, postID, date, uid });

    toast.success("Comment added!", { position: "top-right", autoClose: 5000 });

    setLoading(false);
  }

  return { addComment, isLoading };
}

export function useComments(postID) {
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("date", "asc")
  );
  const [comments, isLoading, error] = useCollectionData(q);
  if (error) throw error;

  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setLoading] = useState(false);

  async function deleteComment() {
    const res = window.confirm("Are you sure you want to delete this comment?");

    if (res) {
      setLoading(true);
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);
      toast.info("Comment deleted!", { position: "top-right", autoClose: 5000 });
      setLoading(false);
    }
  }

  return { deleteComment, isLoading };
}
