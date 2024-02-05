import axios from "axios";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

const Home = ({ me }) => {
  const client = useQueryClient();
  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      const res = await axios.post(
        "http://localhost:4000/api/user/logout",
        undefined,
        { withCredentials: true }
      );
      return res.data;
    },
  });
  const logout = () => {
    mutateAsync().then((res) => {
      if (res.success) {
        client.invalidateQueries(["me"]);
      }
    });
  };
  return (
    <div className="Home">
      <button onClick={logout}>LOGOUT</button>
      <pre>
        <code>{JSON.stringify({ me }, undefined, 2)}</code>
      </pre>
    </div>
  );
};

export default Home;
