import { View, FlatList, Text } from "react-native";
import React from "react";
import { COLORS, recipes } from "../constants";
import Recipe from "../components/Recipe/Recipe";
import RecipeBottomSheet from "../components/RecipeBottomSheet/RecipeBottomSheet";
import { onImpact, onImpactSound } from "../utils";
import { useGlobalState } from "../Context";

const Recipes = () => {
  const all = React.useMemo(() => recipes, []);
  const [recipe, setRecipe] = React.useState(null);
  const bottomSheetRef = React.useRef(null);
  const [{ settings }] = useGlobalState();
  const openRecipe = async (item) => {
    if (settings.vibration) {
      await onImpact();
    }
    if (settings.sound) {
      await onImpactSound();
    }
    setRecipe(item);
    bottomSheetRef.current?.present();
  };
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.main }}>
      <FlatList
        data={all}
        keyExtractor={({ id }) => id}
        renderItem={({ item, index }) => (
          <Recipe
            recipe={item}
            isEven={index % 2 === 0}
            onPress={() => openRecipe(item)}
          />
        )}
      />

      <RecipeBottomSheet ref={bottomSheetRef} recipe={recipe} />
    </View>
  );
};

export default Recipes;
