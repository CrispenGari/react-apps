import React from "react";
import "./NewPassword.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
const NewPassword = () => {
  const { register, handleSubmit } = useForm();
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const { mutateAsync, isLoading } = useMutation({
    mutationKey: ["reset-password"],
    mutationFn: async (variables) => {
      const res = await axios.put(
        "http://localhost:4000/api/user/update-password",
        {
          ...variables,
          e: search.get("e"),
          c: search.get("c"),
        },
        { withCredentials: true }
      );
      return res.data;
    },
  });

  const [state, setState] = React.useState({
    error: "",
  });
  const onSubmit = (data) => {
    mutateAsync(data).then((res) => {
      if (!!res.error) {
        setState({ error: res.error });
      }
      if (res.success) {
        window.alert("You can login with your new password.");
        navigate("/login", { replace: true });
      }
    });
  };
  return (
    <div className="forgot__password">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="new password"
        />
        <br />
        {state.error && <p color="red">{state.error}</p>}
        <br />
        <button type="submit">CHANGE PASSWORD</button>
        <br />
        <Link to={"/register"}>New to this ?</Link>
        <Link to={"/login"}>Back to login</Link>
      </form>
    </div>
  );
};

export default NewPassword;
