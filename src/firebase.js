import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZNRKBPeH6Mm2ig2ugXuKeuNk0bs1g1jE",
  authDomain: "postovi-2c2f1.firebaseapp.com",
  projectId: "postovi-2c2f1",
  storageBucket: "postovi-2c2f1.appspot.com",
  messagingSenderId: "177155326754",
  appId: "1:177155326754:web:ba150b6d8586c55ab81b7b",
  measurementId: "G-WFYVBF8JBV",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

export { db, storage };
