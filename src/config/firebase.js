import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCVFVKWGjxrNxdcbt-MOAaBnhIKcwFBDpg",
    authDomain: "loki-portfolio-f8481.firebaseapp.com",
    projectId: "loki-portfolio-f8481",
    storageBucket: "loki-portfolio-f8481.firebasestorage.app",
    messagingSenderId: "235491194185",
    appId: "1:235491194185:web:ac02abd4f5f0b3ab585698"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);