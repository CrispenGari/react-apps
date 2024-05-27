import { TouchableOpacity, Text, Linking } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "../../styles";
import LazyImage from "../LazyImage/LazyImage";
import Ratting from "../Ratting/Ratting";
import { useGlobalState } from "../../Context";
import { onImpact, onImpactSound } from "../../utils";

const Recipe = ({ recipe, isEven, onPress }) => {
  const [{ settings }] = useGlobalState();
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          padding: 10,
          backgroundColor: isEven ? COLORS.secondary : COLORS.tertiary,
          marginBottom: 1,
        }}
        activeOpacity={0.7}
      >
        <Text style={styles.h1}>{recipe.name}</Text>
        <Text style={styles.p}>
          {recipe.author} ● {recipe.difficult}
        </Text>
        <LazyImage
          uri={recipe.image}
          style={{
            width: "100%",
            height: 150,
            marginVertical: 5,
          }}
        />
        <Ratting value={recipe.rattings} />
        <Text style={styles.p}>{recipe.description}</Text>

        <Text style={[styles.p, { color: COLORS.green, marginVertical: 5 }]}>
          {recipe.subcategory} ● {recipe.dish_type}
        </Text>

        <Text
          onPress={async () => {
            if (settings.vibration) {
              await onImpact();
            }
            if (settings.sound) {
              await onImpactSound();
            }
            Linking.openURL(recipe.url);
          }}
          style={[
            styles.p,
            {
              color: COLORS.green,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
            },
          ]}
        >
          Read more
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Recipe;
