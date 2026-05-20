import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "goggleauth-9829b.firebaseapp.com",
  projectId: "goggleauth-9829b",
  storageBucket: "goggleauth-9829b.firebasestorage.app",
  messagingSenderId: "819366704844",
  appId: "1:819366704844:web:833b72a46bce019cdab469"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();


provider.setCustomParameters({
  prompt: "select_account",
});

export { auth, provider };