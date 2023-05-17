// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBvE4M-U2tBxgwOMQ1SNJPWn50Ig_OGck0",
  authDomain: "chatapp-11578.firebaseapp.com",
  projectId: "chatapp-11578",
  storageBucket: "chatapp-11578.appspot.com",
  messagingSenderId: "339287741101",
  appId: "1:339287741101:web:a9eaf320838178a6602c24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
