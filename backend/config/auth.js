// import { auth } from '../frontend/frontend/src/firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

// export const signUpWithEmail = async (email, password) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     console.log("User signed up and logged in:", userCredential.user);
//   } catch (error) {
//     console.error("Error signing up:", error.message);
//   }
// };

// export const loginWithEmail = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     console.log("User logged in:", userCredential.user);
//   } catch (error) {
//     console.error("Error logging in:", error.message);
//   }
// };

// export const logout = async () => {
//   try {
//     await signOut(auth);
//     console.log("User logged out");
//   } catch (error) {
//     console.error("Error logging out:", error.message);
//   }
// };
