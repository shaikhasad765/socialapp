import React, { useEffect } from "react";
import { LOGIN } from "lib/routes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
// Imports
import { useAuth } from "hooks/auth";
import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import "./CSS/index.css";

export default function Layout() {
  // Get the current pathname from the location
  const { pathname } = useLocation();

  // Get the 'navigate' function to programmatically navigate to routes
  const navigate = useNavigate();

  // Fetch authenticated user data using 'useAuth' hook
  const { user, isLoading } = useAuth();

  // Use an effect to handle route protection and redirection
  useEffect(() => {
    // Check if the user is not authenticated and attempting to access a protected route
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      // Redirect the user to the login page
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading, navigate]);

  // Render a loading message while fetching authenticated user data
  if (isLoading) return "Loading auth user...";

  return (
    <div className="layout-container">
      {/* Render the Navbar component for navigation */}
      <Navbar />

      <div className="content">
        <div className="posts-list-scrollable">
          {/* Render the content of the current route using the Outlet */}
          <Outlet />
        </div>
      </div>

      {/* Render the Sidebar component */}
      <Sidebar />
    </div>
  );
}
