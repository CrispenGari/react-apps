import { View, Text, Button } from "react-native";
import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
const url = "https://cat-fact.herokuapp.com/facts/random?animal_type=";
const ReactQuery = () => {
  const client = useQueryClient();
  const [animal, setAnimal] = React.useState("cat");
  // const { data, isFetching } = useQuery({
  //   queryKey: ["fact", animal],
  //   queryFn: async ({ queryKey }) => {
  //     const [_, animal] = queryKey;
  //     const res = await fetch(url.concat(animal));
  //     const data = await res.json();
  //     return data;
  //   },
  // });

  const { data, isFetching } = useQuery({
    queryKey: ["fact", animal],
    queryFn: async ({ queryKey }) => {
      const [_, animal] = queryKey;
      const res = await axios.get(url.concat(animal));
      return res.data;
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      {isFetching ? (
        <Text>Fetching...</Text>
      ) : (
        <Text>{data ? data.text : "No fact"}</Text>
      )}

      <Button
        title="Randomize Cat"
        disabled={isFetching}
        onPress={async () => {
          setAnimal("cat");
          await client.invalidateQueries(["fact"]);
        }}
      />

      <Button
        title="Randomize Dog"
        disabled={isFetching}
        onPress={async () => {
          setAnimal("dog");
          await client.invalidateQueries(["fact"]);
        }}
      />
    </View>
  );
};

const client = new QueryClient();
export default function () {
  return (
    <QueryClientProvider client={client}>
      <ReactQuery />
    </QueryClientProvider>
  );
}
