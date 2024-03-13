import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  FormField,
  Button,
  Checkbox,
  Form,
  Message,
  Loader,
  Divider,
} from "semantic-ui-react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    error: "",
    agree: false,
  });
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
    if (!state.agree) {
      setState((state) => ({
        ...state,
        error: "You have to aggree with TNS.",
      }));
      return;
    }
    mutateAsync(data).then(async (data) => {
      if (data.error) {
        setState((state) => ({ ...state, error: data.error }));
      } else {
        setState((state) => ({ ...state, error: "" }));
        await client.invalidateQueries(["me"]);
      }
    });
  };
  return (
    <div className="login">
      <div style={{ width: "100%", maxWidth: 400 }}>
        {state.error && <Message error header="Error" content={state.error} />}
        <Form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <FormField>
            <label>Email Address</label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="email address"
            />
          </FormField>
          <FormField>
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              {...register("password", { required: true })}
            />
          </FormField>
          <FormField>
            <Checkbox
              checked={state.agree}
              onChange={(e, data) =>
                setState((state) => ({ ...state, agree: data.checked }))
              }
              label="I agree to the Terms and Conditions"
            />
          </FormField>
          <Link to={"/forgot-password"} style={{ alignSelf: "flex-end" }}>
            Forgot password?
          </Link>
          <br />
          <Button type="submit" primary>
            LOGIN <Loader active={isLoading} inline size="mini" />
          </Button>
          <Divider horizontal>Already have an account?</Divider>
          <Button onClick={() => navigate("/register")} type="button" secondary>
            REGISTER
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
