import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC5jrBYjVex3IZee3cpkZP5f9ITkgiJZl4",
  authDomain: "adopcion-de-arboles.firebaseapp.com",
  projectId: "adopcion-de-arboles",
  storageBucket: "adopcion-de-arboles.firebasestorage.app",
  messagingSenderId: "1021710282514",
  appId: "1:1021710282514:web:359830b079c07ed1218dcb",
  measurementId: "G-PTV113G8RF"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
