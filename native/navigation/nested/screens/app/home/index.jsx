import { createStackNavigator } from "@react-navigation/stack";
import Recipes from "./Recipes";
import Recipe from "./Recipe";

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Recipes">
      <Stack.Screen name="Recipes" component={Recipes} />
      <Stack.Screen name="Recipe" component={Recipe} />
    </Stack.Navigator>
  );
};

export default HomeStack;
