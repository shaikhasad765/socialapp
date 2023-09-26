// Imports
import React from "react";
import { DASHBOARD, LOGIN } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useRegister } from "hooks/auth";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from "utils/form-validate";
import "./Register.css"; 

export default function Register() {
  // Fetch the signup function and isLoading state from a custom hook.
  const { register: signup, isLoading } = useRegister();
  
  // Initialize the form and get access to form methods and errors.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Define a function to handle the registration form submission.
  async function handleRegister(data) {
    // Call the signup function with username, email, password, and redirect URL.
    signup({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });
  }

  return (
    <div className="center-container">
      <div className="box-container">
        <h1 className="heading">Register</h1>

        <form onSubmit={handleSubmit(handleRegister)}>
          {/* Input field for username */}
          <div className={`form-control ${errors.username ? "error" : ""}`}>
            <label>Username</label>
            <input
              placeholder="username"
              {...register("username", usernameValidate)}
            />
            {/* Display error message if username validation fails */}
            {errors.username && (
              <span className="form-error">{errors.username.message}</span>
            )}
          </div>
          
          {/* Input field for email */}
          <div className={`form-control ${errors.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            {/* Display error message if email validation fails */}
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>
          
          {/* Input field for password */}
          <div className={`form-control ${errors.password ? "error" : ""}`}>
            <label>Password</label>
            <input
              type="password"
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            {/* Display error message if password validation fails */}
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </div>
          
          {/* Submit button */}
          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
          >
            {/* Display appropriate text based on the loading state */}
            {isLoading ? "Signing Up" : "Register"}
          </button>
        </form>

        {/* Link to the login page */}
        <p className="text">
          Already have an account?{" "}
          <RouterLink to={LOGIN} className="login-link">
            Log In
          </RouterLink>{" "}
          instead!
        </p>
      </div>
    </div>
  );
}
