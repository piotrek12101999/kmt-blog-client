import * as firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCR6kb0MnihJCql3KC8QTdxHckPKFzc7zE",
  appId: "1:1082815330283:web:508089168e04cbdccb0bae",
  authDomain: "kmt-blog.firebaseapp.com",
  databaseURL: "https://kmt-blog.firebaseio.com",
  messagingSenderId: "1082815330283",
  projectId: "kmt-blog",
  storageBucket: "kmt-blog.appspot.com"
};

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
