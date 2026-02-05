// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4R6KBPqBgwQCLobuFImFPnAfdq5tLU9Q",
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