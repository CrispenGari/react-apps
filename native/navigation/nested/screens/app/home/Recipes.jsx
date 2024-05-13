import { FlatList, View } from "react-native";
import r from "../../../assets/data/recipes.json";
import { RecipeItem } from "../../../components/RecipeItem";
import React from "react";
const Recipes = ({ navigation }) => {
  const recipes = React.useMemo(() => r, []);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={recipes}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => {
          return (
            <RecipeItem
              recipe={item}
              onPress={() =>
                navigation.navigate("Recipe", {
                  id: item.id,
                })
              }
            />
          );
        }}
      />
    </View>
  );
};

export default Recipes;
