import React from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTodoStore, useCounterStore, useUserStore } from "./store";

export default function App() {
  const { user, login, logout } = useUserStore();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 40,
        paddingHorizontal: 10,
      }}
    >
      <Text>{JSON.stringify({ user }, null, 2)}</Text>

      {user ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <Button
          title="Login"
          onPress={() =>
            login({
              id: 10,
              username: "john",
              email: "johndoe@gmail.com",
              gender: "M",
            })
          }
        />
      )}

      <Form />
      <Counter />
      <Todos />
    </View>
  );
}

const Form = () => {
  const [title, setTitle] = React.useState("");
  const { add } = useTodoStore();

  function addTodo() {
    if (title.length > 3) {
      add(title);
      setTitle("");
    }
  }

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Todo title"
        onSubmitEditing={addTodo}
      />
      <Button title="Add todo" onPress={addTodo} />
    </View>
  );
};

const Todos = () => {
  const { todos } = useTodoStore();
  return (
    <ScrollView style={{ flex: 1 }}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ScrollView>
  );
};

const Todo = ({ todo }) => {
  const { update } = useTodoStore();
  function markAsCompleted() {
    update(todo.id);
  }
  return (
    <TouchableOpacity onPress={markAsCompleted}>
      <Text
        style={{
          fontWeight: "900",
          textDecorationLine: todo.done ? "line-through" : "none",
          letterSpacing: 1,
          fontSize: 22,
        }}
      >
        {todo.title}
      </Text>
    </TouchableOpacity>
  );
};

const Counter = () => {
  const { count, increment, decrement } = useCounterStore();
  return (
    <View>
      <Text>{count}</Text>
      <Button
        title="Increment"
        onPress={() => {
          increment(5);
        }}
      />
      <Button
        title="decrement"
        onPress={() => {
          decrement(2);
        }}
      />
    </View>
  );
};
