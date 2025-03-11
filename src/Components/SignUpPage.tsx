import { useState } from "react";
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  getAuth, 
  createUserWithEmailAndPassword, 
  fetchSignInMethodsForEmail 
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Link } from "react-router-dom";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // Function to check if user already exists
  const checkUserExists = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0; // Returns true if the email is registered
    } catch (error) {
      console.error("Error checking user existence:", error);
      return false;
    }
  };

  // Handle Email Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userExists = await checkUserExists(email);
      if (userExists) {
        setError("User already exists. Please log in.");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle Google Signup
  const handleGoogleSignup = async () => {
    setError(null);

    try {
      await signInWithPopup(auth, provider);
      alert("Google Signup successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-900">Create an account</h2>
        <p className="text-gray-500 text-center">Start your 30-day free trial.</p>

        
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSignup} className="mt-4">
          <label className="block text-gray-700 font-medium">Name*</label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="block text-gray-700 font-medium mt-4">Email*</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="block text-gray-700 font-medium mt-4">Password*</label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 mt-4 rounded-lg hover:bg-purple-700"
            onClick={handleSignup}
          >
            Get Started
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full bg-white border py-2 mt-4 flex items-center justify-center rounded-lg hover:bg-gray-100"
        >
          <img
            src="/assets/googlelogo.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Sign up with Google
        </button>

        <p className="text-center text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-purple-600 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
