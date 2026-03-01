// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // <--- HIDDEN KEY
  authDomain: "wich-doc-app.firebaseapp.com",
  projectId: "wich-doc-app",
  storageBucket: "wich-doc-app.firebasestorage.app",
  messagingSenderId: "1027548913256",
  appId: "1:1027548913256:web:a27c915b9de10c8fec65dd",
  measurementId: "G-BPM9JCS38L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };