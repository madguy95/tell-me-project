// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { getAuth, signInAnonymously } from "firebase/auth";


// src/firebase.js
import { setUser } from '@/store/user';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: "tell-me-30e35.appspot.com",
  messagingSenderId: "457709762579",
  appId: "1:457709762579:web:17de8223353e97f2ff27e6",
  measurementId: "G-Q4BET617W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// init firestore service
const db = getFirestore()
const auth = getAuth();
const storage = getStorage();

const loginAnonymously = () => {
  return signInAnonymously(auth)
  .then((userCredential) => {
    const user = userCredential.user;
    setUser(user);  // Lưu thông tin người dùng vào singleton
    return user;
  })
  .catch((error) => {
    console.error("Error signing in anonymously:", error);
    throw error;
  });
};
export { db, analytics, loginAnonymously, auth, storage };