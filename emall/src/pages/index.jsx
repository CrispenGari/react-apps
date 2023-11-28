import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./app/Home/Home";
import NotFound from "./common/NotFound/NotFound";
import Login from "./auth/Login/Login";
import Register from "./auth/Register/Register";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useUserStore } from "../store";

const Root = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setUser(user);
        if (user) {
          navigate("/");
        } else {
          navigate("/login");
        }
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsubscribe();
  }, [navigate, setUser]);

  return user ? (
    <Routes>
      <Route path="/" caseSensitive element={<Home />} />
      <Route path="*" element={<NotFound />} caseSensitive />
    </Routes>
  ) : (
    <Routes>
      <Route path="/login" caseSensitive element={<Login />} />
      <Route path="/register" caseSensitive element={<Register />} />
      <Route path="*" element={<NotFound />} caseSensitive />
    </Routes>
  );
};

export default Root;
