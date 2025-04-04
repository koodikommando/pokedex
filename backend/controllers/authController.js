const { auth } = require('../config/firebase.js');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } = require("firebase/auth");
const pool = require('../database/db.js');

// import db from "../config/db";

const getFirebaseErrorMessage = (errorCode) => {
	switch (errorCode) {
	  case 'auth/email-already-in-use':
		return 'This email address is already registered. Please use a different one.';
	  case 'auth/invalid-email':
		return 'The email address you entered is not valid. Please check the format.';
	  case 'auth/weak-password':
		return 'Your password is too weak. Please use at least 6 characters.';
	  case 'auth/wrong-password':
		return 'Incorrect password. Please try again.';
	  case 'auth/user-not-found':
		return 'No user found with this email address. Please sign up.';
	  case 'auth/network-request-failed':
		return 'Network error. Please check your internet connection and try again.';
	  default:
		return 'An unknown error occurred. Please try again later.';
	}
  };



  const emailSignup = async (req, res) => {
	return;
    console.log("SIGNING UP");
    const { email, password, username } = req.body;  // Extract username from the request body
    console.log("email:", email, "password:", password, "username:", username);
    
    try {
        // Create the user in Firebase Authentication
        const newUser = await createUserWithEmailAndPassword(auth, email, password);
        const userId = newUser.user.uid;
        const idToken = await newUser.user.getIdToken();
        
        // Now, insert the user into your PostgreSQL database with the Firebase UID and username
        const queryText = "INSERT INTO users (id, email, username) VALUES ($1, $2, $3) RETURNING *";
        const result = await pool.query(queryText, [userId, email, username]);  // Pass username to the query
        
        console.log("User saved to database:", result.rows[0]);
    
        // Respond with the Firebase UID and ID token
        res.status(201).json({ userId, idToken });
    } catch (error) {
        console.error("Error signing up user:", error);
        const errorMessage = getFirebaseErrorMessage(error.code);
        res.status(400).json({ error: errorMessage });
    }
};

  

const emailLogin = async (req, res) => {
	return;
	const { email, password } = req.body;
	try {
	  const userCredential = await signInWithEmailAndPassword(auth, email, password);
	  console.log("User logged in:", userCredential.user);
	  const userId = userCredential.user.uid;  // The unique user ID
	  const idToken = await userCredential.user.getIdToken(); // Firebase ID token (JWT)
	  res.status(200).json({ userId, idToken });
	} catch (error) {
	  console.error("Error logging in:", error.message);
	  res.status(400).json({ message: 'Error logging in', error: error.message });
	}
  };
  

  const logoutUser = async (req, res) => {
	return;
	try {
	  await signOut(auth);
	  console.log("User logged out successfully");
	  
	  res.status(200).json({ message: 'User logged out successfully' });
	} catch (error) {
	  console.error("Error logging out:", error.message);
	  res.status(400).json({ message: 'Error logging out', error: error.message });
	}
  };


module.exports = { emailSignup, emailLogin, logoutUser };