import React, { useEffect } from "react";
import { LOGIN } from "lib/routes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "hooks/auth";
import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import "./CSS/index.css"; // Import your external CSS file here

export default function Layout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && pathname.startsWith("/protected") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user, isLoading, navigate]);

  if (isLoading) return "Loading auth user...";

  return (
    <div className="layout-container">
      <Navbar />
      <div className="content">
        <div className="posts-list-scrollable">
          <Outlet />
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
