import React from "react";
import "./Todo.css";
import { useMutation, useQueryClient } from "react-query";
import { del, update } from "./api";

const Todo = ({ todo }) => {
  const client = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: update,
  });
  const deleteMutation = useMutation({
    mutationFn: del,
  });
  const deleteTodo = () => {
    deleteMutation.mutate(
      { id: todo.id },
      {
        onSuccess: (data) => {
          client.invalidateQueries(["todos"]);
        },
      }
    );
  };
  const updateTodo = () => {
    updateMutation.mutate(
      { id: todo.id },
      {
        onSuccess: (data) => {
          client.invalidateQueries(["todos"]);
        },
      }
    );
  };
  return (
    <div
      className="todo"
      style={{
        backgroundColor: todo.completed ? "crimson" : "#f5f5f5",
      }}
      onClick={updateTodo}
    >
      <h1
        style={{
          textDecorationLine: todo.completed ? "line-through" : "none",
          color: todo.completed ? "white" : "black",
        }}
      >
        {todo.title}
      </h1>
      <button onClick={deleteTodo}>DELETE</button>
    </div>
  );
};

export default Todo;
