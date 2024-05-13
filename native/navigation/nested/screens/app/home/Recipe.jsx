import { ScrollView, Image, Text, View } from "react-native";
import React from "react";
import r from "../../../assets/data/recipes.json";

const Recipe = ({ navigation, route }) => {
  const recipe = React.useMemo(
    () => r.find((recipe) => recipe.id === route.params.id),
    [route]
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: recipe.name ?? "Recipe",
    });
  }, [recipe]);

  if (!!!recipe)
    return (
      <View style={{ flex: 1 }}>
        <Text>Hi Recipe with id: {route.params.id}</Text>
      </View>
    );
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{
        backgroundColor: "white",
        padding: 10,
        flex: 1,
      }}
    >
      <Image
        source={{ uri: recipe.image }}
        style={{ width: "100%", height: 150 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{recipe.name}</Text>
      <Text style={{ fontSize: 16 }}>{recipe.description}</Text>
    </ScrollView>
  );
};

export default Recipe;
