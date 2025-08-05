// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAPTzjuGatSrMZ4TtCjj4sfkRwD4w-fhzQ",
  authDomain: "flashloan-arbitrage-bot.firebaseapp.com",
  projectId: "flashloan-arbitrage-bot",
  storageBucket: "flashloan-arbitrage-bot.firebasestorage.app",
  messagingSenderId: "1008522870297",
  appId: "1:1008522870297:web:c09afa2b6d3c4c2d9cb488",
  measurementId: "G-FPV5CTBKKQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
