import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { signup } from "../../../Features/Auth/authSlice";

const SignUp = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await dispatch(signup(userData)).unwrap();
      navigate(0);
    } catch (error) {
      console.error("Failed to signup: ", error);
    }
  };

  return (
    <div className="loginSignUpTabsContentRegister">
      {authError && <p style={{ color: "red" }}>{authError}</p>}
      {authStatus === "succeeded" && (
        <p style={{ color: "green" }}>Success! Redirecting...</p>
      )}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username *"
          required
          value={userData.name}
          onChange={(e) =>
            setUserData({ ...userData, name: e.target.value })
          }
        />
        <input
          type="email"
          placeholder="Email address *"
          required
          value={userData.email}
          onChange={(e) =>
            setUserData({ ...userData, email: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="Password *"
          required
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <p>
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our
          <Link
            to="/terms"
            style={{ textDecoration: "none", color: "#c32929" }}
          >
            {" "}
            privacy policy
          </Link>
          .
        </p>
        {authStatus === "loading" ? (
          <CircularProgress />
        ) : (
          <button type="submit">Sign Up</button>
        )}
      </form>
    </div>
  );
};

export default SignUp;
