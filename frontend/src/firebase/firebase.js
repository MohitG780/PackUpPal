
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCDWL2xjHnPgnHvvKjW6ODv9HZFj1pfuF0",
  authDomain: "packuppal-96f6c.firebaseapp.com",
  projectId: "packuppal-96f6c",
  storageBucket: "packuppal-96f6c.firebasestorage.app",
  messagingSenderId: "380131010495",
  appId: "1:380131010495:web:9fa718da3eb75d0973630a",
  measurementId: "G-J4LHNQKMCF"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
export {app,auth};