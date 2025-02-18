// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
    apiKey: "AIzaSyACvyBRkQCyFsE-2QuGNyH1bMXnFvx3yjQ",
    authDomain: "swapna-car-rent.firebaseapp.com",
    projectId: "swapna-car-rent",
    storageBucket: "swapna-car-rent.appspot.com",
    messagingSenderId: "453278064817",
    appId: "1:453278064817:web:095c120169c8b6d73b0290",
    measurementId: "G-DBG0KVDH5Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Authentication
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export the db and auth instances for use in your app
export { db, auth, googleProvider };
