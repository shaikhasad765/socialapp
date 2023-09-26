import React from "react";
import { RouterProvider } from "react-router-dom"; // Import RouterProvider
import { router } from "lib/routes"; // Import the router configuration
import "./App.css";
import { ToastContainer } from "react-toastify"; // Import ToastContainer for notifications

export default function App() {
  return (
    <div className="main">
      <RouterProvider router={router} /> {/* Use the defined router */}
      <ToastContainer /> {/* Add ToastContainer for notifications */}
    </div>
  );
}
