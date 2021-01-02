import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
var firebaseConfig = {
    apiKey: "AIzaSyAJY4G0yubPc-3e1xxsyVBDa7jxvIe4Ohs",
    authDomain: "toanote-3f7f3.firebaseapp.com",
    projectId: "toanote-3f7f3",
    storageBucket: "toanote-3f7f3.appspot.com",
    messagingSenderId: "688316815373",
    appId: "1:688316815373:web:5b61f84a25f88e823d5d44",
    measurementId: "G-61J710Y7F4"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();
