// Imports
import React from "react";
import { DASHBOARD, REGISTER } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "utils/form-validate";
import './Login.css'

export default function Login() {
  // Fetch the login function and isLoading state from a custom hook.
  const { login, isLoading } = useLogin();
  
  // Initialize the form and get access to form methods and errors.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Define a function to handle the login form submission.
  async function handleLogin(data) {
    // Call the login function with email, password, and redirect URL.
    login({
      email: data.email,
      password: data.password,
      redirectTo: DASHBOARD,
    });
  }

  return (
    <div className="center-container">
      <div className="login-box">
        <h1 className="login-heading">Log In</h1>

        <form onSubmit={handleSubmit(handleLogin)}>
          {/* Input field for email */}
          <div className={`form-control ${errors.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", emailValidate)}
            />
            {/* Display error message if email validation fails */}
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          
          {/* Input field for password */}
          <div className={`form-control ${errors.password ? "error" : ""}`}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", passwordValidate)}
            />
            {/* Display error message if password validation fails */}
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          
          {/* Submit button */}
          <button
            className="login-button"
            type="submit"
            disabled={isLoading}
          >
            {/* Display appropriate text based on the loading state */}
            {isLoading ? "Logging In" : "Log In"}
          </button>
        </form>

        {/* Link to the registration page */}
        <p className="register-text">
          Don't have an account?{" "}
          <RouterLink to={REGISTER} className="register-link">
            Register
          </RouterLink>{" "}
          instead!
        </p>
      </div>
    </div>
  );
}
