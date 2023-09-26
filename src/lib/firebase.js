import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDJSI_47rI3mLBUhJEdR8oITkF0Mf1h4n0",
  authDomain: "social-media-app-81d78.firebaseapp.com",
  projectId: "social-media-app-81d78",
  storageBucket: "social-media-app-81d78.appspot.com",
  messagingSenderId: "370083144999",
  appId: "1:370083144999:web:92270ff8c9676bec193502"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
