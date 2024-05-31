import React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import { reducers } from "./reducers";
import { addTodo, decrement, increment, updateTodo } from "./actions";

const store = createStore(reducers);

export default function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 30,
        paddingHorizontal: 10,
      }}
    >
      <Form />
      <Counter />
      <Todos />
    </View>
  );
}

const Form = () => {
  const [title, setTitle] = React.useState("");
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  function add() {
    if (title.length > 3) {
      dispatch(
        addTodo({
          title,
          done: false,
          id: todos.length,
        })
      );
      setTitle("");
    }
  }

  return (
    <View>
      <TextInput
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Todo title"
      />
      <Button title="Add todo" onPress={add} />
    </View>
  );
};

const Todos = () => {
  const todos = useSelector((state) => state.todo);
  return (
    <ScrollView style={{ flex: 1 }}>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </ScrollView>
  );
};

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  function markAsCompleted() {
    dispatch(updateTodo(todo));
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
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  return (
    <View>
      <Text>{count}</Text>
      <Button
        title="Increment"
        onPress={() => {
          dispatch(increment(5));
        }}
      />
      <Button
        title="decrement"
        onPress={() => {
          dispatch(decrement(2));
        }}
      />
    </View>
  );
};
