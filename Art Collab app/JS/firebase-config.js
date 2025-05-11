 // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc,getDoc,updateDoc,addDoc,collection, query, where, getDocs, deleteDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDJasZlkd5sR_B2U9h5l80HwPWV1cd3ZSg",
    authDomain: "artcollabapp.firebaseapp.com",
    projectId: "artcollabapp",
    storageBucket: "artcollabapp.firebasestorage.app",
    messagingSenderId: "334993062918",
    appId: "1:334993062918:web:a63c5a5328ceb0cb8c5787",
    measurementId: "G-YD2WS2FENS"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, setDoc, doc,getDoc,updateDoc,addDoc,collection, query, where, getDocs,deleteDoc, arrayUnion,signOut };