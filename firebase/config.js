import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyB4PUloc_nDZYq-fTLZZQHdBoADBpJxa00",
  authDomain: "yolarkadasimapp-12194.firebaseapp.com",
  projectId: "yolarkadasimapp-12194",
  storageBucket: "yolarkadasimapp-12194.appspot.com",
  messagingSenderId: "197739363863",
  appId: "1:197739363863:web:1f889e8bab98ea8c63e652",
  measurementId: "G-E7HDK5SHPX",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
