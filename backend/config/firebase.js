// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJBrj1RG-_HmEjF_Fbc5yQlrACnNOijh4",
  authDomain: "crm-facuminas.firebaseapp.com",
  projectId: "crm-facuminas",
  storageBucket: "crm-facuminas.appspot.com",
  messagingSenderId: "805042200534",
  appId: "1:805042200534:web:2d3f1d903574b4722e4e77",
  measurementId: "G-Z0ZYE4S15B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app