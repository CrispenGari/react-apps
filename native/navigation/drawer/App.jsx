import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

import recipes from "./assets/data/recipes.json";
import budget from "./assets/data/budget.json";
import health from "./assets/data/health.json";
import inspiration from "./assets/data/inspiration.json";
import baking from "./assets/data/inspiration.json";
import React from "react";

const Drawer = createDrawerNavigator();

const getIconMap = (color = "white") => {
  return {
    Recipes: <Ionicons name="fast-food-sharp" size={24} color={color} />,
    Settings: <Ionicons name={"settings"} size={24} color={color} />,
    Baking: (
      <MaterialCommunityIcons
        name="bread-slice-outline"
        size={24}
        color={color}
      />
    ),
    Budget: <FontAwesome name="money" size={24} color={color} />,
    Health: <MaterialIcons name="health-and-safety" size={24} color={color} />,
    Inspiration: <MaterialIcons name="food-bank" size={24} color={color} />,
  };
};

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}

const ReciepeHeader = ({ route, navigation }) => {
  const IconMap = getIconMap("black");
  return (
    <View
      style={{
        width: "100%",
        paddingTop: 40,
        paddingBottom: 5,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBlockColor: "gray",
      }}
    >
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ paddingHorizontal: 20 }}>{IconMap[route.name]}</View>
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>{route.name}</Text>
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
          }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Ionicons name="menu" size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f5f5f5",
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 10,
          gap: 10,
          marginTop: 10,
        }}
      >
        <Ionicons size={30} name="search" />
        <TextInput placeholder={`Search ${route.name}...`} />
      </View>
    </View>
  );
};

const ProfileHeader = ({ navigation, route }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingTop: 40,
        paddingBottom: 5,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBlockColor: "gray",
      }}
    >
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./assets/1.webp")}
          style={{
            width: 50,
            height: 50,
            marginHorizontal: 20,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>{route.name}</Text>
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
          }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Ionicons name="menu" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SettingsHeader = ({ navigation, route }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingTop: 40,
        paddingBottom: 5,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBlockColor: "gray",
      }}
    >
      <View
        style={{
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./assets/1.webp")}
          style={{
            width: 50,
            height: 50,
            marginHorizontal: 20,
          }}
        />
        <Text style={{ fontWeight: "bold", fontSize: 30 }}>{route.name}</Text>
        <TouchableOpacity
          style={{
            marginHorizontal: 20,
          }}
          onPress={() => navigation.toggleDrawer()}
        >
          <Ionicons name="menu" size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#f5f5f5",
          marginHorizontal: 10,
          padding: 10,
          borderRadius: 10,
          gap: 10,
          marginTop: 10,
        }}
      >
        <Ionicons size={30} name="search" />
        <TextInput placeholder="Search Settings..." />
      </View>
    </View>
  );
};
const Routes = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: true,
        drawerType: "slide",
        headerTitleAlign: "center",
        overlayColor: "rgba(0, 0, 0, .7)",
        drawerActiveBackgroundColor: "#00215E",
        drawerPosition: "left",
        drawerHideStatusBarOnOpen: false,
        header: ({ navigation, route }) => (
          <ReciepeHeader navigation={navigation} route={route} />
        ),
      }}
      drawerContent={({ navigation, state }) => {
        const IconMap = getIconMap();
        return (
          <DrawerContentScrollView
            showsVerticalScrollIndicator={true}
            style={{
              flex: 1,
              backgroundColor: "black",
              padding: 0,
              paddingRight: 0,
              paddingTop: 30,
            }}
          >
            {state.routes.map((route, index) =>
              route.name === "Profile" ? (
                <ProfileItem
                  navigation={navigation}
                  route={route}
                  index={index}
                  state={state}
                  key={route.key}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => navigation.navigate(route.name)}
                  key={route.key}
                  style={{
                    padding: 20,
                    width: "100%",
                    backgroundColor: state.index === index ? "red" : "black",
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  {IconMap[route.name]}
                  <Text style={{ color: "white" }}>{route.name}</Text>
                </TouchableOpacity>
              )
            )}
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Recipes" component={Home} />
      <Drawer.Screen name="Budget" component={Budget} />
      <Drawer.Screen name="Health" component={Health} />
      <Drawer.Screen name="Inspiration" component={Inspiration} />
      <Drawer.Screen name="Baking" component={Baking} />
      <Drawer.Screen name="Settings" component={Settings} />
    </Drawer.Navigator>
  );
};

const Profile = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ProfileHeader navigation={navigation} route={route} />,
    });
  }, [navigation, route]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Profile Screen</Text>
    </View>
  );
};
const Home = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={recipes}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => {
          return <RecipeItem recipe={item} />;
        }}
      />
    </View>
  );
};
const Settings = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SettingsHeader navigation={navigation} route={route} />,
    });
  }, [navigation, route]);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold", fontSize: 30 }}>Settings Screen</Text>
    </View>
  );
};

const Baking = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={baking}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => {
          return <RecipeItem recipe={item} />;
        }}
      />
    </View>
  );
};
const Budget = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={budget}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => {
          return <RecipeItem recipe={item} />;
        }}
      />
    </View>
  );
};
const Health = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={health}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => {
          return <RecipeItem recipe={item} />;
        }}
      />
    </View>
  );
};
const Inspiration = ({ navigation, route }) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={inspiration}
        keyExtractor={({ id }) => id}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => {
          return <RecipeItem recipe={item} />;
        }}
      />
    </View>
  );
};

const ProfileItem = ({ navigation, route, index, state }) => {
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate(route.name)}
        style={{
          padding: 20,
          width: "100%",
          backgroundColor: state.index === index ? "red" : "black",
          alignItems: "center",
          paddingVertical: 100,
        }}
      >
        <Text style={{ color: "white" }}>John Doe</Text>
        <Image
          source={require("./assets/cat.webp")}
          style={{
            width: 150,
            height: 150,
            borderRadius: 150,
            marginVertical: 10,
          }}
        />
        <TouchableOpacity
          style={{
            padding: 20,
            width: "100%",
            backgroundColor: "cornflowerblue",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "gray",
          marginVertical: 30,
        }}
      />
    </>
  );
};

const RecipeItem = ({ recipe }) => (
  <View
    style={{
      padding: 10,
      backgroundColor: "white",
      borderRadius: 10,
    }}
  >
    <Image
      source={{ uri: recipe.image }}
      style={{ width: "100%", height: 150 }}
    />
    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{recipe.name}</Text>
    <Text style={{ fontSize: 16 }}>{recipe.description}</Text>
  </View>
);
