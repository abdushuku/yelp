import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = { 
  apiKey: "AIzaSyA90pXW5wTkgGcmVjURpItxxYUUq6KytvM", 
  authDomain: "my-yelp-astrum.firebaseapp.com", 
  projectId: "my-yelp-astrum", 
  storageBucket: "my-yelp-astrum.appspot.com", 
  messagingSenderId: "129734946642", 
  appId: "1:129734946642:web:3636405dba0c047d38d48b", 
  measurementId: "G-L6MFF2SJ0W" 
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

export const db = getFirestore(app);
