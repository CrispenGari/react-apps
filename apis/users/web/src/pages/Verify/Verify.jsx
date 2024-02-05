import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import "./Verify.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Verify = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = React.useState("");
  const client = useQueryClient();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["verify"],
    mutationFn: async (variables) => {
      const res = await axios.post(
        "http://localhost:4000/api/user/verify",
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
        if (data.success) {
          await client.invalidateQueries(["me"]);
        }
      }
    });
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("code", { required: true })}
          placeholder="veryificatio code"
        />
        <br />
        {error && <p color="red">{error}</p>}
        <br />
        <button type="submit">Verify account</button>
        <br />
        <Link to={"/register"}>New to this ?</Link>
        <Link to={"/login"}>I want to login</Link>
      </form>
    </div>
  );
};

export default Verify;
