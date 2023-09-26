import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "lib/routes";
import "./App.css";
import { ToastContainer } from "react-toastify"; // Import ToastContainer

export default function App() {
  return (
    <div className="main">
      <RouterProvider router={router} />
      <ToastContainer /> {/* Add ToastContainer */}
    </div>
  );
}
