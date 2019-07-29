import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDVD5-WeHKQkPKu2uWqpqQX1XdwEX7GbhA",
  authDomain: "xtv-online.firebaseapp.com",
  databaseURL: "https://xtv-online.firebaseio.com",
  projectId: "xtv-online",
  storageBucket: "xtv-online.appspot.com",
  messagingSenderId: "934004794357",
  appId: "1:934004794357:web:5f539aecd1635237"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const agenda = db.collection("agenda");
