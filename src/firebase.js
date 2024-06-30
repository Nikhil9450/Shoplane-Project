import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKP8WoIb_EOebXCdCp3NH263cuWIz2OPY",
  authDomain: "shoplane-95cfb.firebaseapp.com",
  projectId: "shoplane-95cfb",
  storageBucket: "shoplane-95cfb.appspot.com",
  messagingSenderId: "85493442200",
  appId: "1:85493442200:web:cf9f5e6e7b781e327552ed",
  measurementId: "G-KW72MVYN28"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);