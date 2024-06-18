import { FlatList } from "react-native";
import React from "react";
import { db } from "../firebase";
import { KEYS } from "../constants";

import HomeHeader from "../components/HomeHeader";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Channel from "../components/Channel";
import { retrieve, store } from "../utils";
import * as Notifications from "expo-notifications";

const Home = ({ navigation }) => {
  const [channels, setChannels] = React.useState([]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HomeHeader navigation={navigation} />,
    });
  }, [navigation]);

  React.useEffect(() => {
    retrieve(KEYS.CHANNELS).then((value) => {
      if (value) {
        const c = JSON.parse(value);
        setChannels(c);
      }
    });
    const ref = collection(db, "channels");
    const q = query(ref, orderBy("updatedAt", "desc"));

    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const c = querySnapshot.docs.map((c) => ({ id: c.id, ...c.data() }));
      await store(KEYS.CHANNELS, JSON.stringify(c));
      setChannels(c);
    });
    return () => unsubscribe();
  }, []);

  React.useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener(
      (_notification) => {}
    );
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log({ id: response.notification.request.content.data.chatId });
        navigation.navigate("chat", {
          id: response.notification.request.content.data.id,
        });
      });
    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  return (
    <FlatList
      data={channels}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => {
        return <Channel channel={item} navigation={navigation} />;
      }}
    />
  );
};

export default Home;
