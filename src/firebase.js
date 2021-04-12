import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
const firebaseApp = firebase.initializeApp ({

    apiKey: "AIzaSyC8_HYqqI7uKr5SZ7cQytCrtmIyAC4z1XA",
    authDomain: "react-firebase-todo-88f86.firebaseapp.com",
    projectId: "react-firebase-todo-88f86",
    storageBucket: "react-firebase-todo-88f86.appspot.com",
    messagingSenderId: "128095917889",
    appId: "1:128095917889:web:87430ac7a1105c28aeb3c0",
    measurementId: "G-85MS5SCPT3"
});

const db = firebaseApp.firestore();

export default db;

