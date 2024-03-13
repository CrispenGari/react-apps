import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyApwBmv9c2g7uYUtNnpQ-IIpBv_LCFzICY",
  authDomain: "emall-dbae3.firebaseapp.com",
  projectId: "emall-dbae3",
  storageBucket: "emall-dbae3.appspot.com",
  messagingSenderId: "251538928791",
  appId: "1:251538928791:web:91de65bcf3d9f3447325d2",
  measurementId: "G-3J826RXPS9",
};

const app = initializeApp(firebaseConfig);

export const googleAuthProvider = new GoogleAuthProvider();
export const githubAuthProvider = new GithubAuthProvider();
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const timestamp = serverTimestamp();
