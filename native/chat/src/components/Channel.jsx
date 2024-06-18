import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Avatar from "./Avatar";
import { COLORS, FONTS, KEYS, relativeTimeObject } from "../constants";
import { db } from "../firebase";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useMeStore } from "../store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocal from "dayjs/plugin/updateLocale";
import { retrieve, schedulePushNotification, store } from "../utils";
import { useNotificationsToken } from "../hooks/useNotificationToken";

dayjs.extend(relativeTime);
dayjs.extend(updateLocal);

dayjs.updateLocale("en", {
  relativeTime: relativeTimeObject,
});

const Channel = ({ channel, navigation }) => {
  const [lastMessage, setLastMessage] = React.useState(null);
  const { me } = useMeStore();
  const { token } = useNotificationsToken();
  React.useEffect(() => {
    retrieve(KEYS.LAST_MESSAGE(channel.id)).then((v) => {
      if (v) {
        const l = JSON.parse(v);
        setLastMessage(l);
      }
    });
    const channelRef = doc(db, "channels", channel.id);
    const messagesRef = collection(channelRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"), limit(1));
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const l =
        querySnapshot.docs.map((c) => ({
          id: c.id,
          ...c.data(),
          createdAt: c.data().createdAt.toDate(),
        }))[0] ?? null;

      if (l.id !== lastMessage?.id && !!token && me?.uid !== l.user._id) {
        await schedulePushNotification({
          title: `New message - ${channel?.name}`,
          body: l.text,
          data: {
            id: channel.id,
          },
        });
      }
      await store(KEYS.LAST_MESSAGE(channel.id), JSON.stringify(l));
      setLastMessage(l);
    });
    return () => unsubscribe();
  }, [channel, token, me]);

  const onPress = () => {
    navigation.navigate("chat", {
      id: channel.id,
    });
  };
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        flexDirection: "row",
        gap: 10,
      }}
      onPress={onPress}
    >
      <Avatar alt={channel.name} />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: 18,
          }}
        >
          {channel.name}
        </Text>
        {lastMessage ? (
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.regular,
              color: "gray",
              marginTop: -5,
            }}
            numberOfLines={1}
          >
            {lastMessage.text} •́{" "}
            <Text
              style={{
                fontFamily: FONTS.bold,
              }}
            >
              {me?.uid === lastMessage.user?._id
                ? "you"
                : lastMessage.user.name}
            </Text>
            .
          </Text>
        ) : (
          <Text
            style={{
              fontSize: 14,
              fontFamily: FONTS.regular,
              color: "gray",
              marginTop: -5,
            }}
          >
            No messages in this channel
          </Text>
        )}
      </View>

      <Text style={{ fontFamily: FONTS.regular, color: COLORS.tertiary }}>
        {dayjs(
          lastMessage?.createdAt ? lastMessage.createdAt : new Date()
        ).fromNow()}
      </Text>
    </TouchableOpacity>
  );
};

export default Channel;
