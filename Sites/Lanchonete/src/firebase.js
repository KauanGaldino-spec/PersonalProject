import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCBbZxxNy5WLeRYW79IiAOdrdctvtiVMVA",
  authDomain: "ok-30dca.firebaseapp.com",
  projectId: "ok-30dca",
  storageBucket: "ok-30dca.firebasestorage.app",
  messagingSenderId: "599131062587",
  appId: "1:599131062587:web:7e5ce95ef3cbee4a7c771e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { app, auth, googleProvider, signInWithPopup, db };
