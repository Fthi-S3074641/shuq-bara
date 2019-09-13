import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAROu_ZBifJgYSt8C7Xnb-yyNMAWe-_dMM",
  authDomain: "inventory-axum.firebaseapp.com",
  databaseURL: "https://inventory-axum.firebaseio.com",
  projectId: "inventory-axum",
  storageBucket: "inventory-axum.appspot.com",
  messagingSenderId: "372554140195",
  appId: "1:372554140195:web:d20ccb272a2c9a9f"
});

export const db = firebaseApp.firestore();