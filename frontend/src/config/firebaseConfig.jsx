// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATFiQHlPNw4qg4hce3GkIt68Odknv4Mmc",
  authDomain: "naf-web-a97b3.firebaseapp.com",
  projectId: "naf-web-a97b3",
  storageBucket: "naf-web-a97b3.firebasestorage.app",
  messagingSenderId: "862239162776",
  appId: "1:862239162776:web:81b522bb7d047257322bed",
  measurementId: "G-JGZSKEBH29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);