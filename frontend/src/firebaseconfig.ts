// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCdJxtkYzWqlHaEsh-_5w_MCLXI93v93Vk",
  authDomain: "chat-application-cfd37.firebaseapp.com",
  projectId: "chat-application-cfd37",
  storageBucket: "chat-application-cfd37.appspot.com",
  messagingSenderId: "935440197800",
  appId: "1:935440197800:web:fce061b27df0b42b36ba9d",
  measurementId: "G-J81F0RTGCP",
  databaseURL: "https://chat-application-cfd37-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app }