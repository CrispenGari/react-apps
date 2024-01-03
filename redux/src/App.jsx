import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  login,
  logout,
  register,
  reset,
} from "./actions";
import User from "./User";
import Count from "./Count";

const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state);
  return (
    <div className="app">
      {user ? (
        <>
          <Count />
          <button
            onClick={() => {
              dispatch(increment(6));
            }}
          >
            increment
          </button>
          <button
            onClick={() => {
              dispatch(decrement(5));
            }}
          >
            decrement
          </button>
          <button
            onClick={() => {
              dispatch(reset());
            }}
          >
            reset
          </button>
        </>
      ) : null}
      <br />
      <button
        onClick={() => {
          dispatch(
            login({
              id: 1,
              firstName: "Tom",
              lastName: "Jack",
              gender: "male",
              dob: 2000,
            })
          );
        }}
      >
        login
      </button>
      <button
        onClick={() => {
          dispatch(
            register({
              id: 1,
              firstName: "Tom",
              lastName: "Jack",
              gender: "male",
              dob: 2000,
            })
          );
        }}
      >
        register
      </button>
      <button
        onClick={() => {
          dispatch(logout());
        }}
      >
        logout
      </button>
      <User />
    </div>
  );
};

export default App;
