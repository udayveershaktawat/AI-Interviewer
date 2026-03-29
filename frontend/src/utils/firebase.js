// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interview-9f038.firebaseapp.com",
  projectId: "ai-interview-9f038",
  storageBucket: "ai-interview-9f038.firebasestorage.app",
  messagingSenderId: "94715053793",
  appId: "1:94715053793:web:36853513260e891a53d9a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}