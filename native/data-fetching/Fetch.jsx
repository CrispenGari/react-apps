import { View, Text, Button } from "react-native";
import React from "react";

const url = "https://cat-fact.herokuapp.com/facts/random?animal_type=cat";

const Fetch = () => {
  const [state, setState] = React.useState({
    fact: null,
    fetching: false,
    error: null,
  });

  React.useEffect(() => {
    setState((state) => ({
      ...state,
      fetching: true,
    }));
    fetch(url, { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setState((state) => ({
          ...state,
          fetching: false,
          error: null,
          fact: data,
        }));
      })
      .catch((err) => {
        setState((state) => ({
          ...state,
          fetching: false,
          error: err.message,
        }));
      });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      {state.fetching ? (
        <Text>Fetching...</Text>
      ) : (
        <Text>{state.fact ? state.fact.text : "No fact"}</Text>
      )}

      <Button
        title="Randomize"
        disabled={state.fetching}
        onPress={() => {
          setState((state) => ({
            ...state,
            fetching: true,
          }));
          fetch(url, { method: "GET" })
            .then((res) => res.json())
            .then((data) => {
              setState((state) => ({
                ...state,
                fetching: false,
                error: null,
                fact: data,
              }));
            })
            .catch((err) => {
              setState((state) => ({
                ...state,
                fetching: false,
                error: err.message,
              }));
            });
        }}
      />
    </View>
  );
};

export default Fetch;
