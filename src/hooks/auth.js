// Imports
import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { auth, db } from "lib/firebase";
import { DASHBOARD, LOGIN } from "lib/routes";
import { useNavigate } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import isUsernameExists from "utils/isUsernameExists";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Custom hook to retrieve authenticated user information
export function useAuth() {
  const [authUser, authLoading, error] = useAuthState(auth);
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const ref = doc(db, "users", authUser.uid);
      const docSnap = await getDoc(ref);
      setUser(docSnap.data());
      setLoading(false);
    }

    if (!authLoading) {
      if (authUser) fetchData();
      else setLoading(false); 
    }
  }, [authLoading, authUser]);

  return { user, isLoading, error };
}

// Custom hook for user login
export function useLogin() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = DASHBOARD }) {
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("You are logged in", { position: "top-right", autoClose: 5000 });
      navigate(redirectTo);
    } catch (error) {
      toast.error(`Logging in failed: ${error.message}`, { position: "top-right", autoClose: 5000 });
    } finally {
      setLoading(false);
    }
  }

  return { login, isLoading };
}

// Custom hook for user registration
export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = DASHBOARD,
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast.error("Username already exists", { position: "top-right", autoClose: 5000 });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        toast.success("Account created. You are logged in", { position: "top-right", autoClose: 5000 });
        navigate(redirectTo);
      } catch (error) {
        toast.error(`Signing Up failed: ${error.message}`, { position: "top-right", autoClose: 5000 });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}

// Custom hook for user logout
export function useLogout() {
  const [signOut, isLoading] = useSignOut(auth);
  const navigate = useNavigate();

  async function logout() {
    if (await signOut()) {
      toast.success("Successfully logged out", { position: "top-right", autoClose: 5000 });
      navigate(LOGIN);
    } else {
      toast.error("Logout failed", { position: "top-right", autoClose: 5000 });
    }
  }

  return { logout, isLoading };
}

// Main application component
function App() {
  return (
    <div>
      {/* Including the ToastContainer in your component hierarchy */}
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
}

export default App;
