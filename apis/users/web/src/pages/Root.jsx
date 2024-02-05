import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register/Register";
import Home from "./Home/Home";
import Login from "./Login/Login";
import NotFound from "./NotFound/NotFound";
import { useQuery } from "react-query";
import axios from "axios";
import Verify from "./Verify/Verify";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import NewPassword from "./NewPassword/NewPassword";

const Root = () => {
  const navigate = useNavigate();
  const { isLoading, data: user } = useQuery({
    queryKey: ["me"],
    queryFn: async (params) => {
      const res = await axios.get("http://localhost:4000/api/user/me", {
        withCredentials: true,
      });
      return res.data;
    },
  });

  React.useEffect(() => {
    if (!!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  if (isLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <p>Loading....</p>
      </div>
    );
  }
  if (!!!user || !user.verified) {
    return (
      <Routes>
        <Route path="/" caseSensitive element={<NoUser />} />
        <Route path="/register" caseSensitive element={<Register />} />
        <Route path="/verify" caseSensitive element={<Verify />} />
        <Route path="/login" caseSensitive element={<Login />} />
        <Route
          path="/forgot-password"
          caseSensitive
          element={<ForgotPassword />}
        />
        <Route path="/new-password" caseSensitive element={<NewPassword />} />
        <Route path="*" element={<NotFound />} caseSensitive />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" caseSensitive element={<Home me={user} />} />
      <Route path="*" element={<NotFound />} caseSensitive />
    </Routes>
  );
};

export default Root;

const NoUser = () => {
  const navigate = useNavigate();
  React.useEffect(() => navigate("/login", { replace: true }), [navigate]);
  return null;
};
