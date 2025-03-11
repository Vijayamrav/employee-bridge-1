import { useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Contexts/UsernameConetxt";

// Firebase Configuration 
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Function to get the username after Google sign-in
export const getUserName = async (): Promise<string | null> => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user.displayName || null;
  } catch (error) {
    console.error("Google Sign-in error:", error);
    return null; // Handle errors properly
  }
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const {setUsername}=useAuth()

  const navigate = useNavigate();

  // 🔑 Handle Email/Password Login
  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in:", userCredential.user);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login error:", error);

        // 🔴 Handle Firebase Authentication Errors
        switch ((error as any).code) {
          case "auth/user-not-found":
            setError("User does not exist. Please sign up.");
            break;
          case "auth/wrong-password":
            setError("Incorrect password. Try again.");
            break;
          case "auth/invalid-email":
            setError("Invalid email format.");
            break;
          default:
            setError(error.message);
        }
      }
    }
  };

  // 🔵 Handle Google Sign-in
  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUsername(user.displayName)
      console.log("Username:", user.displayName);

      navigate("/dashboard", { state: { username: user.displayName } });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Google Sign-in error:", error);
        setError(error.message);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 shadow-lg rounded-lg">
       
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold text-purple-700">NexaAdmin</h2>
        </div>

        
        <h2 className="text-2xl font-semibold text-center">Log in to your account</h2>
        <p className="text-center text-gray-600">Welcome back! Please enter your details.</p>

       
        {error && <p className="text-red-500 text-center">{error}</p>}

        
        <form className="space-y-4" onSubmit={handleEmailLogin}>
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              placeholder="•••••••"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-gray-700">
              <input type="checkbox" className="mr-2" />
              Remember for 30 days
            </label>
            <a href="#" className="text-purple-600 hover:underline">Forgot password?</a>
          </div>

          {/* Sign-in Button */}
          <button type="submit" className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800">
            Sign in
          </button>
        </form>

        {/* Google Sign-in */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 border py-2 rounded-lg hover:bg-gray-100"
        >
          <img
            src="/assets/googlelogo.png"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Sign in with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-600">
          Don’t have an account? <Link to="/" className="text-purple-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
