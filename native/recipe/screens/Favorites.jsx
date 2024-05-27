import { View, Text, FlatList } from "react-native";
import React from "react";
import { styles } from "../styles";
import RecipeBottomSheet from "../components/RecipeBottomSheet/RecipeBottomSheet";
import Recipe from "../components/Recipe/Recipe";
import { COLORS } from "../constants";
import { useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useGlobalState } from "../Context";

const Favorites = () => {
  const [{ favorites }] = useGlobalState();
  const { dismiss } = useBottomSheetModal();
  const [recipe, setRecipe] = React.useState(null);
  const bottomSheetRef = React.useRef(null);
  const openRecipe = (item) => {
    setRecipe(item);
    bottomSheetRef.current?.present();
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.main }}>
      {favorites.length === 0 ? (
        <Text style={[styles.p, { marginVertical: 30, alignSelf: "center" }]}>
          No favourite recipes
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={({ id }) => id}
          renderItem={({ item, index }) => (
            <Recipe
              recipe={item}
              isEven={index % 2 === 0}
              onPress={() => openRecipe(item)}
            />
          )}
        />
      )}

      <RecipeBottomSheet
        ref={bottomSheetRef}
        recipe={recipe}
        closeSheet={dismiss}
      />
    </View>
  );
};

export default Favorites;
