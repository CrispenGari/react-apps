import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { useFonts } from "expo-font";
import { COLORS, Fonts } from "./constants";
import Loading from "./components/Loading/Loading";
import Routes from "./routes";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { initialState, reducer } from "./reducers";
import { AppProvider } from "./Context";
const App = () => {
  const [loaded] = useFonts(Fonts);

  if (!loaded) return <Loading />;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AppProvider initialState={initialState} reducer={reducer}>
          <View style={{ flex: 1, backgroundColor: COLORS.main }}>
            <StatusBar style="auto" />
            <Routes />
          </View>
        </AppProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
