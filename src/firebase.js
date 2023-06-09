import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBLsHAtOCgIB4XW6RGXIC50LKlRrzd_h0c",
    authDomain: "todo-app-me-e6e9e.firebaseapp.com",
    projectId: "todo-app-me-e6e9e",
    storageBucket: "todo-app-me-e6e9e.appspot.com",
    messagingSenderId: "233508543345",
    appId: "1:233508543345:web:c45e3d7ca687d74de174d0",
    measurementId: "G-92HLPCYVBX"
});
const db = firebaseApp.firestore();

export default db;