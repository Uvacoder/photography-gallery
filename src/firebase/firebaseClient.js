import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBciNrtEQZGRPHCk__8NypueENR_rg2PRA",
  authDomain: "photography-galler.firebaseapp.com",
  projectId: "photography-galler",
  storageBucket: "photography-galler.appspot.com",
  messagingSenderId: "874395807379",
  appId: "1:874395807379:web:751f7b11688d94153d2766",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };
