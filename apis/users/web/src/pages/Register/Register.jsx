import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import "./Register.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = React.useState("");
  const client = useQueryClient();
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (variables) => {
      const res = await axios.post(
        "http://localhost:4000/api/user/register",
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
        navigate("/verify");
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
          type="text"
          {...register("firstName", { required: true })}
          placeholder="First Name"
        />
        <br />
        <input
          type="text"
          {...register("lastName", { required: true })}
          placeholder="Last Name"
        />
        <br />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        {error && <p color="red">{error}</p>}
        <br />
        <button type="submit">REGISTER</button>
        <br />
        <Link to={"/login"}>Already have an account ?</Link>
      </form>
    </div>
  );
};

export default Register;
