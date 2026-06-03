import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBTBzQQlzU3fOJ_SOE07ANsL079rzQ_6l4",
  authDomain: "cybergrid.firebaseapp.com",
  projectId: "cybergrid",
  storageBucket: "cybergrid.firebasestorage.app",
  messagingSenderId: "974184310088",
  appId: "1:974184310088:web:7e0cf7af3d97190c257f7d",
  measurementId: "G-EVH5D6HEH7"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)