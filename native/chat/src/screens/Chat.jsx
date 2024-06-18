import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Avatar from "../components/Avatar";
import { COLORS, FONTS, KEYS } from "../constants";
import { GiftedChat, Send } from "react-native-gifted-chat";
import { useMeStore } from "../store";
import { Ionicons } from "@expo/vector-icons";
import { retrieve, store } from "../utils";
import { useOs } from "../hooks/useOs";
const Chat = ({ navigation, route }) => {
  const chatId = route.params.id;
  const [messages, setMessages] = React.useState([]);
  const [channel, setChannel] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const { me } = useMeStore();
  const { os } = useOs();

  React.useEffect(() => {
    getDoc(doc(db, "channels", chatId)).then((snap) => {
      setChannel({ id: chatId, ...snap.data() });
    });
  }, [chatId]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: channel?.name ?? "Chat",
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <Avatar alt={channel?.name || "Chat"} />
        </View>
      ),
      headerStyle: {
        height: os === "ios" ? 100 : 80,
        backgroundColor: COLORS.primary,
      },
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        >
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, channel, os]);

  const onSend = React.useCallback((messages = []) => {
    const channelRef = doc(db, "channels", chatId);
    setDoc(channelRef, { updatedAt: new Date() }, { merge: true });
    const [{ _id, ...msg }] = messages;
    const messagesRef = collection(channelRef, "messages");

    addDoc(messagesRef, {
      text: msg.text,
      updatedAt: new Date(),
      createdAt: msg.createdAt,
      user: !!msg.user.avatar
        ? {
            _id: msg.user._id,
            name: msg.user.name,
            avatar: msg.user.avatar,
          }
        : {
            _id: msg.user._id,
            name: msg.user.name,
          },
    }).catch((error) => console.log(error));
  }, []);

  React.useEffect(() => {
    retrieve(KEYS.MESSAGES(chatId)).then((value) => {
      if (value) {
        const m = JSON.parse(value);
        setMessages(m);
      }
    });
    const channelRef = doc(db, "channels", chatId);
    const messagesRef = collection(channelRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));
    setLoading(true);
    const unsubscribe = onSnapshot(q, async (querySnapshot) => {
      const m = querySnapshot.docs.map((c) => ({
        _id: c.id,
        ...c.data(),
        createdAt: c.data().createdAt.toDate(),
      }));
      await store(KEYS.MESSAGES(chatId), JSON.stringify(m));
      setMessages(m);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [chatId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GiftedChat
        renderChatEmpty={() => (
          <View
            style={{
              flex: 1,
              backgroundColor: COLORS.main,
              padding: 30,
              transform: [{ rotate: "180deg" }],
            }}
          >
            {loading ? (
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                Loading...
              </Text>
            ) : (
              <Text
                style={{
                  fontFamily: FONTS.regular,
                  fontSize: 18,
                  textAlign: "center",
                }}
              >
                No messages.
              </Text>
            )}
          </View>
        )}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: me?.uid,
          name: me.email,
          avatar: me.avatar ?? "",
        }}
        placeholder="Create message..."
        alwaysShowSend={false}
        timeFormat="HH:mm"
        showUserAvatar
        renderAvatarOnTop={false}
        renderTicks={() => (
          <Ionicons name="checkmark-done" size={14} color={COLORS.tertiary} />
        )}
        textInputStyle={{
          fontFamily: os === "android" ? FONTS.regular : "",
          fontSize: os === "android" ? 20 : 17.5,
        }}
        renderSend={(props) => (
          <Send {...props}>
            <View style={{ marginRight: 10, marginBottom: 5 }}>
              <Ionicons name="send-outline" size={24} color={COLORS.tertiary} />
            </View>
          </Send>
        )}
      />
    </SafeAreaView>
  );
};

export default Chat;
