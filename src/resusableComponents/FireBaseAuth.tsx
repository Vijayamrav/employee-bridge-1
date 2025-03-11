import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut, 
  GoogleAuthProvider 
} from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("Google Sign-in successful:", result.user);
    return result.user; 
  } catch (error) {
    console.error("Google Sign-in error:", error);
    throw error; 
  }
};


export const signInWithEmail = async (email:any, password:any) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Email Sign-in successful:", userCredential.user);
    return userCredential.user; 
  } catch (error) {
    console.error("Email Sign-in error:", error);
    throw error;
  }
};


export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign-out error:", error);
  }
};


export { auth };
