import "react-native-gesture-handler";
import { StatusBar, LogBox } from "react-native";
import Routes from "./src/routes";
import { View } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

LogBox.ignoreLogs;
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <View style={{ flex: 1 }}>
          <StatusBar />
          <Routes />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
