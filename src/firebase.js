import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCd7wmxgSkXhIy9NV286oWpHoi-244kne8",
    authDomain: "auth-abaa9.firebaseapp.com",
    projectId: "auth-abaa9",
    storageBucket: "auth-abaa9.firebasestorage.app",
    messagingSenderId: "1071029865342",
    appId: "1:1071029865342:web:0b626c81a66ba8d33e012f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);