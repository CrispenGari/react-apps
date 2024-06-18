import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_API_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_API_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_API_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_API_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_API_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_API_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// auth

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const AUTH_PROVIDERS = {
  github: new GithubAuthProvider(),
  google: new GoogleAuthProvider(),
};
// database

export const db = getFirestore(app);
export const timestamp = serverTimestamp();
