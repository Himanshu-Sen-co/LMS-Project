// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginvidyaflow.firebaseapp.com",
  projectId: "loginvidyaflow",
  storageBucket: "loginvidyaflow.firebasestorage.app",
  messagingSenderId: "841917763481",
  appId: "1:841917763481:web:c74641bac79a40f3f24d08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider};    