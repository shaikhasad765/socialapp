import React from "react";
import { DASHBOARD, REGISTER } from "lib/routes";
import { Link as RouterLink } from "react-router-dom";
import { useLogin } from "hooks/auth";
import { useForm } from "react-hook-form";
import { emailValidate, passwordValidate } from "utils/form-validate";
import './Login.css'

export default function Login() {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
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
          <div className={`form-control ${errors.email ? "error" : ""}`}>
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              {...register("email", emailValidate)}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>
          <div className={`form-control ${errors.password ? "error" : ""}`}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              {...register("password", passwordValidate)}
            />
            {errors.password && <span className="error-message">{errors.password.message}</span>}
          </div>
          <button
            className="login-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging In" : "Log In"}
          </button>
        </form>

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
