// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOsHMaSpwSuLsAkyvH9eHX-61P_HMiSOs",
  authDomain: "aira-8d64e.firebaseapp.com",
  projectId: "aira-8d64e",
  storageBucket: "aira-8d64e.appspot.com", // corrected
  messagingSenderId: "463556749574",
  appId: "1:463556749574:web:e6d0b0f7a4eaf17ab61687",
  measurementId: "G-0VZYQET0EF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

