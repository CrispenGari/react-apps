import React from "react";
import { Input, Button, IconButton } from "@mui/material";
import { Facebook, GitHub } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../../firebase";
const Login = () => {
  const [state, setState] = React.useState({
    error: "",
    password: "",
    email: "",
  });

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      state.email.trim().toLowerCase(),
      state.password.trim()
    )
      .then((user) => {
        setState((state) => ({ ...state, email: "", password: "", error: "" }));
        console.log(user.user);
      })
      .catch((error) => {
        setState((state) => ({ ...state, password: "" }));
        setState((state) => ({ ...state, error: error.message }));
      });
  };

  const google = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((user) => {
        setState((state) => ({
          ...state,
          email: "",
          password: "",
          error: "",
        }));
        console.log(user.user);
      })
      .catch((error) => {
        setState((state) => ({ ...state, password: "" }));
        setState((state) => ({ ...state, error: error.message }));
      });
  };
  return (
    <div className="login">
      <form className="login__form" onSubmit={login}>
        <h1>Login</h1>
        <img src="/logo.png" alt="logo" />
        <Input
          className="login__form__input"
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            setState((state) => ({ ...state, email: e.target.value }))
          }
        />
        <Input
          className="login__form__input"
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            setState((state) => ({ ...state, password: e.target.value }))
          }
        />

        <p className="login__form__error">{state.error}</p>
        <Button type="submit" variant="contained">
          Login
        </Button>
        <div className="login__label">
          Or Login with <span></span>
        </div>
        <div className="login__providers">
          <IconButton
            onClick={google}
            className="login__providers__btn"
            aria-label="google"
          >
            <FcGoogle />
          </IconButton>
          <IconButton className="login__providers__btn" aria-label="github">
            <GitHub style={{ color: "#24282E" }} />
          </IconButton>
          <IconButton className="login__providers__btn" aria-label="facebook">
            <Facebook style={{ color: "#0867FE" }} />
          </IconButton>
        </div>
        <div className="login__label">
          New to the app? <span></span>
        </div>
        <Link to={"/register"}>Register</Link>
      </form>
    </div>
  );
};

export default Login;
