import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBEzw6zezyyAZCHnQyu8u2-65abXawB2MY",
    authDomain: "wedp-ab515.firebaseapp.com",
    projectId: "wedp-ab515",
    storageBucket: "wedp-ab515.appspot.com",
    messagingSenderId: "543595219617",
    appId: "1:543595219617:web:ac848523916bc2ebc7bee0",
    measurementId: "G-08SC5V2ZV4"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const auth = getAuth(app);
const storage = getStorage(app);

export {auth,db,storage};