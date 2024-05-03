"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
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
    measurementId: "G-J81F0RTGCP"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
