// Import necessary modules from react-router-dom
import { createBrowserRouter } from "react-router-dom";

// Import React components used for routing
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Layout from "components/layout";
import Dashboard from "components/dashboard";
import Comments from "components/comments";
import Profile from "components/profile";
import Users from "components/users";

// Define route paths as constants
export const LOGIN = "/";
export const REGISTER = "/register";

export const PROTECTED = "/protected";
export const DASHBOARD = "/protected/dashboard";
export const USERS = "/protected/users";
export const PROFILE = "/protected/profile/:id";
export const COMMENTS = "/protected/comments/:id";

// Create a router configuration using createBrowserRouter
export const router = createBrowserRouter([
  // Define routes and their corresponding components
  { path: LOGIN, element: <Login /> }, // When the path is "/", render the Login component
  { path: REGISTER, element: <Register /> }, // When the path is "/register", render the Register component
  {
    path: PROTECTED, // When the path is "/protected",
    element: <Layout />, // render the Layout component as a layout wrapper,
    children: [ // and within the Layout component, define child routes
      {
        path: DASHBOARD, // When the path is "/protected/dashboard",
        element: <Dashboard />, // render the Dashboard component
      },
      {
        path: USERS, // When the path is "/protected/users",
        element: <Users />, // render the Users component
      },
      {
        path: PROFILE, // When the path is "/protected/profile/:id",
        element: <Profile />, // render the Profile component
      },
      {
        path: COMMENTS, // When the path is "/protected/comments/:id",
        element: <Comments />, // render the Comments component
      },
    ],
  },
]);
