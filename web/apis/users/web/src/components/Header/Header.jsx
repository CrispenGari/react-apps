import React from "react";
import "./Header.css";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Button, Loader } from "semantic-ui-react";

const Header = ({ me }) => {
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
    <div className="header">
      <h1>Payment App</h1>
      <div>
        <p>
          Hello, {me.firstName} {me.lastName}. You are logged in as {me.email}.
        </p>
      </div>
      <Button type="button" primary onClick={logout}>
        LOGOUT <Loader active={isLoading} inline size="mini" />
      </Button>
    </div>
  );
};

export default Header;
