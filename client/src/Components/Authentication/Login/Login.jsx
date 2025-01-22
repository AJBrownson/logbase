import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { login } from "../../../Features/Auth/authSlice";

const Login = ({ switchToRegister }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(credentials)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to login: ", error);
    }
  };

  return (
    <div className="loginSignUpTabsContentLogin">
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      {authStatus === "succeeded" && (
        <p style={{ color: "green" }}>Success! Redirecting...</p>
      )}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address *"
          required
          value={credentials.email}
          onChange={(e) =>
            setCredentials({ ...credentials, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password *"
          required
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <div className="loginSignUpForgetPass">
          <label>
            <input type="checkbox" className="brandRadio" />
            <p>Remember me</p>
          </label>
          <p>
            <Link to="/resetPassword">Lost password?</Link>
          </p>
        </div>
        {authStatus === "loading" ? (
          <CircularProgress />
        ) : (
          <button type="submit">Login</button>
        )}
      </form>
      <div className="loginSignUpTabsContentLoginText">
        <p>
          No account yet? <span onClick={switchToRegister}>Create Account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
