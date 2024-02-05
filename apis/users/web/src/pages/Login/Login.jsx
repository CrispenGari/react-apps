import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import "./Login.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = React.useState("");
  const client = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (variables) => {
      const res = await axios.post(
        "http://localhost:4000/api/user/login",
        {
          ...variables,
        },
        { withCredentials: true }
      );
      return res.data;
    },
  });
  const onSubmit = (data) => {
    mutateAsync(data).then(async (data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        await client.invalidateQueries(["me"]);
      }
    });
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="email address"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {error && <p color="red">{error}</p>}
        <br />
        <Link to={"/forgot-password"}>Forgot password?</Link>
        <br />
        <button type="submit">LOGIN</button>
        <br />
        <Link to={"/register"}>New to this ?</Link>
      </form>
    </div>
  );
};

export default Login;
