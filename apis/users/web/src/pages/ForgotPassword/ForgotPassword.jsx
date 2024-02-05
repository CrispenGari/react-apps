import React from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (variables) => {
      const res = await axios.post(
        "http://localhost:4000/api/user/request-password-link",
        {
          ...variables,
        },
        { withCredentials: true }
      );
      return res.data;
    },
  });
  const [state, setState] = React.useState({
    error: "",
    message: "",
  });

  const onSubmit = (data) => {
    mutateAsync(data).then((res) => {
      if (!!res.error) {
        setState((state) => ({ ...state, error: res.error, message: "" }));
      } else {
        setState((state) => ({ ...state, message: res.message, error: "" }));
      }
    });
  };
  return (
    <div className="forgot__password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{state.message}</p>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="email address"
        />
        <br />
        {state.error && <p color="red">{state.error}</p>}
        <br />
        <button type="submit">SEND RESET PASSWORD LINK</button>
        <br />
        <Link to={"/register"}>New to this ?</Link>
        <Link to={"/login"}>Back to login</Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
