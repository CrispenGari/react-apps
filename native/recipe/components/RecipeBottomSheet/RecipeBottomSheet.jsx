import { Text, Linking, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  BottomSheetModal,
  BottomSheetFooter,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { COLORS, KEYS } from "../../constants";
import LazyImage from "../LazyImage/LazyImage";
import Ratting from "../Ratting/Ratting";
import { styles } from "../../styles";
import { Ionicons } from "@expo/vector-icons";
import { onImpact, onImpactSound, retrive, store } from "../../utils";
import { useGlobalState } from "../../Context";
import { ACTION_TYPES } from "../../reducers";

const RecipeBottomSheet = React.forwardRef(({ recipe, closeSheet }, ref) => {
  const [{ favorites, settings }, dispatch] = useGlobalState();
  const snapPoints = React.useMemo(() => ["80%"], []);
  const [liked, setLiked] = React.useState(false);
  const addOrRemoveFromFavourites = async () => {
    if (settings.vibration) {
      await onImpact();
    }
    if (settings.sound) {
      await onImpactSound();
    }
    const res = await retrive(KEYS.FAVOURITE);
    const favourites = res ? JSON.parse(res) : [];
    if (liked) {
      // unlike the recipe
      const _filtered = favourites.filter((r) => r.id !== recipe?.id);
      await store(KEYS.FAVOURITE, JSON.stringify(_filtered));
      dispatch({
        type: ACTION_TYPES.UNLIKE,
        value: recipe?.id,
      });
    } else {
      // like
      const _new = [recipe, ...favourites];
      dispatch({
        type: ACTION_TYPES.LIKE,
        value: recipe,
      });
      await store(KEYS.FAVOURITE, JSON.stringify(_new));
    }
    if (closeSheet) {
      closeSheet();
    }
  };

  React.useEffect(() => {
    const found = favorites.find((r) => r.id === recipe?.id);
    setLiked(!!found);
  }, [recipe, favorites]);

  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      handleComponent={() => (
        <View style={{ marginTop: 5, alignItems: "center" }}>
          <TouchableOpacity
            onPress={async () => {
              if (settings.vibration) {
                await onImpact();
              }
              if (settings.sound) {
                await onImpactSound();
              }
              ref.current?.dismiss();
            }}
          >
            <Ionicons name="chevron-down" size={20} />
          </TouchableOpacity>
        </View>
      )}
      ref={ref}
      snapPoints={snapPoints}
      backgroundStyle={{
        backgroundColor: COLORS.main,
      }}
      footerComponent={(props) => (
        <BottomSheetFooter
          {...props}
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 20,
            justifyContent: "space-between",
            paddingBottom: 20,
            borderTopWidth: 1,
            borderTopColor: COLORS.tertiary,
            backgroundColor: COLORS.primary,
          }}
        >
          <Text style={styles.p} numberOfLines={1}>
            {recipe?.name}
          </Text>
          <TouchableOpacity onPress={addOrRemoveFromFavourites}>
            <Ionicons
              color={COLORS.green}
              name={liked ? "heart" : "heart-outline"}
              size={30}
            />
          </TouchableOpacity>
        </BottomSheetFooter>
      )}
    >
      <BottomSheetScrollView
        style={{ flex: 1, padding: 10 }}
        contentContainerStyle={{
          paddingBottom: 150,
        }}
      >
        <Text style={styles.h1}>{recipe?.name}</Text>
        <Text style={styles.p}>
          {recipe?.author} ● {recipe?.difficult}
        </Text>
        <LazyImage
          uri={recipe?.image}
          style={{
            width: "100%",
            height: 150,
            marginVertical: 5,
          }}
        />
        <Ratting value={recipe?.rattings} />
        <Text style={styles.p}>{recipe?.description}</Text>
        <Text style={[styles.p, { color: COLORS.green, marginVertical: 5 }]}>
          {recipe?.subcategory} ● {recipe?.dish_type}
        </Text>
        <Text style={[styles.h1, { fontSize: 18, marginTop: 10 }]}>
          What do I need to cook the recipe?
        </Text>
        {recipe?.ingredients.map((ingredient, index) => (
          <Text
            key={index}
            style={[styles.p, { color: COLORS.green, marginVertical: 2 }]}
          >
            ● {ingredient}
          </Text>
        ))}
        <Text style={[styles.h1, { fontSize: 18, marginTop: 10 }]}>
          What steps should I follow?
        </Text>
        {recipe?.steps.map((step, index) => (
          <Text
            key={index}
            style={[styles.p, { color: COLORS.green, marginVertical: 2 }]}
          >
            ● {step}
          </Text>
        ))}
        <Text style={[styles.h1, { fontSize: 18, marginTop: 10 }]}>
          How many people does this recipe serve?
        </Text>
        <Text style={[styles.p, { color: COLORS.green, marginVertical: 2 }]}>
          ● {recipe?.serves}
        </Text>
        <Text style={[styles.h1, { fontSize: 18, marginTop: 10 }]}>
          What nutrients are in this recipe?
        </Text>

        {Object.entries(recipe?.nutrients || {}).map(([n, v], index) => (
          <Text
            key={index}
            style={[styles.p, { color: COLORS.green, marginVertical: 2 }]}
          >
            🍇 {n} ● {v}
          </Text>
        ))}

        <Text style={[styles.h1, { fontSize: 18, marginTop: 10 }]}>
          Preparation & Cooking duration?
        </Text>
        {Object.entries(recipe?.times || {}).map(([k, v], index) => (
          <Text
            key={index}
            style={[styles.p, { color: COLORS.green, marginVertical: 2 }]}
          >
            ⌚ {k} ● {v}
          </Text>
        ))}
        <Text
          onPress={() => Linking.openURL(recipe?.url)}
          style={[
            styles.p,
            {
              color: COLORS.green,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              marginTop: 20,
            },
          ]}
        >
          Read more
        </Text>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

export default RecipeBottomSheet;
