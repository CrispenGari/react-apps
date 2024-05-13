import { TouchableOpacity, Image, Text } from "react-native";
import React from "react";

export class RecipeItem extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { recipe, onPress } = this.props;
    return (
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "white",
          borderRadius: 10,
        }}
        onPress={onPress}
      >
        <Image
          source={{ uri: recipe.image }}
          style={{ width: "100%", height: 150 }}
        />
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{recipe.name}</Text>
        <Text style={{ fontSize: 16 }}>{recipe.description}</Text>
      </TouchableOpacity>
    );
  }
}

export default RecipeItem;
