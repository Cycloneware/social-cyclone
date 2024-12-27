// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Get DOM elements
const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const logoutButton = document.getElementById('logout-btn');
const signupForm = document.getElementById('signup');
const loginForm = document.getElementById('login');

// Handle user sign-out
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        console.log("User signed out");
        window.location.reload();
    }).catch((error) => {
        console.log("Error signing out:", error);
    });
});

// Listen for changes in authentication state
onAuthStateChanged(auth, user => {
    if (user) {
        // User is signed in
        signupForm.style.display = 'none';
        loginForm.style.display = 'none';
        loginLink.style.display = 'none';
        signupLink.style.display = 'none';
        logoutButton.style.display = 'inline';
    } else {
        // No user is signed in
        signupForm.style.display = 'block';
        loginForm.style.display = 'block';
        loginLink.style.display = 'inline';
        signupLink.style.display = 'inline';
        logoutButton.style.display = 'none';
    }
});
