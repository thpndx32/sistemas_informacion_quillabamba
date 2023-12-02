// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//QUILLABAMBA
const firebaseConfig = {
  apiKey: "AIzaSyD6Wtb8X3K_1mL0mML7nQdSqzeCwStUIms",
  authDomain: "quillabamba-d681a.firebaseapp.com",
  projectId: "quillabamba-d681a",
  storageBucket: "quillabamba-d681a.appspot.com",
  messagingSenderId: "188782389668",
  appId: "1:188782389668:web:fad842bed399b382893931",
  measurementId: "G-DL67WKX2FJ"
};
/*//QUILLABAMBA 1
const firebaseConfig = {
  apiKey: "AIzaSyAmpnKJFvxHO2xuQom5Wfwj8qFv-IIQ0IY",
  authDomain: "quillabamba-1.firebaseapp.com",
  projectId: "quillabamba-1",
  storageBucket: "quillabamba-1.appspot.com",
  messagingSenderId: "343991937346",
  appId: "1:343991937346:web:c26dd87c128a66217c80db"
};*/

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);