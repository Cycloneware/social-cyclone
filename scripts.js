// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATIAdsKrwKein6PXQpyBB7WlUn6nzTlfM",
    authDomain: "social-cyclone.firebaseapp.com",
    projectId: "social-cyclone",
    storageBucket: "social-cyclone.appspot.com",
    messagingSenderId: "537484262670",
    appId: "1:537484262670:web:238408f9740b7576542b5f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign Up Function
export function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Sign-Up Successful:", userCredential.user);
            window.location.href = "profile.html"; // Redirect to profile
        })
        .catch((error) => {
            console.error("Error during Sign-Up:", error.message);
            alert("Sign-Up failed: " + error.message);
        });
}

// Login Function
export function login(email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Login Successful:", userCredential.user);
            window.location.href = "profile.html"; // Redirect to profile
        })
        .catch((error) => {
            console.error("Error during Login:", error.message);
            alert("Login failed: " + error.message);
        });
}

// Google Sign-In Function
export function googleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Google Sign-In Successful:", user.displayName);
            window.location.href = "profile.html"; // Redirect to profile
        })
        .catch((error) => {
            if (error.code === "auth/popup-closed-by-user") {
                console.warn("Sign-In popup was closed by the user.");
                alert("Sign-In canceled. Please try again.");
            } else {
                console.error("Error during Google Sign-In:", error.message);
                alert("Google Sign-In failed: " + error.message);
            }
        });
}

// Listen for Auth State Changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User is logged in:", user.email);
        // Optionally redirect logged-in users to the profile page
        if (window.location.pathname.includes("login.html") || window.location.pathname.includes("signup.html")) {
            window.location.href = "profile.html";
        }
    } else {
        console.log("No user is logged in.");
    }
});
