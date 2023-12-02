import React from "react";
import { Input, Button, IconButton } from "@mui/material";
import { Facebook, GitHub } from "@mui/icons-material";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {
  auth,
  githubAuthProvider,
  googleAuthProvider,
} from "../../../firebase";
const Register = () => {
  const [state, setState] = React.useState({
    error: "",
    password: "",
    email: "",
  });

  const register = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
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
        setState((state) => ({ ...state, email: "", password: "", error: "" }));
        console.log(user.user);
      })
      .catch((error) => {
        setState((state) => ({ ...state, password: "" }));
        setState((state) => ({ ...state, error: error.message }));
      });
  };

  const github = () => {
    signInWithPopup(auth, githubAuthProvider)
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
    <div className="register">
      <form className="register__form" onSubmit={register}>
        <h1>Register</h1>
        <img src="/logo.png" alt="logo" />
        <Input
          className="register__form__input"
          type="email"
          placeholder="Email"
          value={state.email}
          onChange={(e) =>
            setState((state) => ({ ...state, email: e.target.value }))
          }
        />
        <Input
          className="register__form__input"
          type="password"
          placeholder="Password"
          value={state.password}
          onChange={(e) =>
            setState((state) => ({ ...state, password: e.target.value }))
          }
        />

        <p className="register__form__error">{state.error}</p>
        <Button type="submit" variant="contained">
          Register
        </Button>
        <div className="register__label">
          Or Register with <span></span>
        </div>
        <div className="register__providers">
          <IconButton
            onClick={google}
            className="register__providers__btn"
            aria-label="google"
          >
            <FcGoogle />
          </IconButton>
          <IconButton
            onClick={github}
            className="register__providers__btn"
            aria-label="github"
          >
            <GitHub style={{ color: "#24282E" }} />
          </IconButton>
          <IconButton
            className="register__providers__btn"
            aria-label="facebook"
          >
            <Facebook style={{ color: "#0867FE" }} />
          </IconButton>
        </div>
        <div className="register__label">
          Have an Account ?<span></span>
        </div>
        <Link to={"/login"}>Login</Link>
      </form>
    </div>
  );
};

export default Register;
