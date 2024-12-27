// Import Firebase dependencies
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATIAdsKrwKein6PXQpyBB7WlUn6nzTlfM",
    authDomain: "social-cyclone.firebaseapp.com",
    projectId: "social-cyclone",
    storageBucket: "social-cyclone.firebasestorage.app",
    messagingSenderId: "537484262670",
    appId: "1:537484262670:web:238408f9740b7576542b5f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Sign-In
export function googleSignIn() {
    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("Google Sign-In Successful:", user.displayName);

            // Redirect to profile page upon success
            window.location.href = "profile.html";
        })
        .catch((error) => {
            console.error("Error during Google Sign-In:", error.message);
            alert("Google Sign-In failed: " + error.message);
        });
}

// Sign-Out
export function googleSignOut() {
    signOut(auth)
        .then(() => {
            console.log("User signed out successfully.");
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Sign-Out failed:", error.message);
        });
}

// Detect Login State
export function checkAuthState() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            console.log("User is signed in:", user.displayName);
            document.getElementById('user-name').innerText = `Welcome, ${user.displayName}`;
        } else {
            console.log("No user is signed in.");
        }
    });
}

// Initialize Google Sign-In Button
export function initGoogleButton() {
    const googleSignInButton = document.getElementById('google-signin-button');
    if (googleSignInButton) {
        googleSignInButton.addEventListener('click', googleSignIn);
    }
}

// Initialize Log Out Button
export function initLogoutButton() {
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', googleSignOut);
    }
}

// Initialize Scripts
document.addEventListener("DOMContentLoaded", () => {
    initGoogleButton();
    initLogoutButton();
    checkAuthState();
});
