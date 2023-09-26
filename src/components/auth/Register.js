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
import "./Register.css"; // Import your external CSS file here

export default function Register() {
  const { register: signup, isLoading } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleRegister(data) {
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
          <div className={`form-control ${errors.username ? "error" : ""}`}>
            <label>Username</label>
            <input
              placeholder="username"
              {...register("username", usernameValidate)}
            />
            {errors.username && (
              <span className="form-error">{errors.username.message}</span>
            )}
          </div>
          <div className={`form-control ${errors.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="user@email.com"
              {...register("email", emailValidate)}
            />
            {errors.email && (
              <span className="form-error">{errors.email.message}</span>
            )}
          </div>
          <div className={`form-control ${errors.password ? "error" : ""}`}>
            <label>Password</label>
            <input
              type="password"
              placeholder="password123"
              {...register("password", passwordValidate)}
            />
            {errors.password && (
              <span className="form-error">{errors.password.message}</span>
            )}
          </div>
          <button
            type="submit"
            className={`submit-button ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? "Signing Up" : "Register"}
          </button>
        </form>

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
