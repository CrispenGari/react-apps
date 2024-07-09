import { View, Text, Button } from "react-native";
import React from "react";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "https://cat-fact.herokuapp.com/",
});

const AxiosComponent = () => {
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
    axios
      .get("facts/random?animal_type=cat")
      .then((res) => {
        setState((state) => ({
          ...state,
          fetching: false,
          error: null,
          fact: res.data,
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
        title="Randomize Cat"
        disabled={state.fetching}
        onPress={() => {
          setState((state) => ({
            ...state,
            fetching: true,
          }));
          axios
            .get("facts/random?animal_type=cat")
            .then((res) => {
              setState((state) => ({
                ...state,
                fetching: false,
                error: null,
                fact: res.data,
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

      <Button
        title="Randomize Dog"
        disabled={state.fetching}
        onPress={() => {
          setState((state) => ({
            ...state,
            fetching: true,
          }));
          axios
            .get("facts/random?animal_type=dog")
            .then((res) => {
              setState((state) => ({
                ...state,
                fetching: false,
                error: null,
                fact: res.data,
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

export default AxiosComponent;
