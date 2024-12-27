// Firebase initialization and authentication
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Firebase config (ensure it’s correct)
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

// Sign-Up function
async function signUp(username, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);
        alert("Sign up successful!");
        // Optionally, handle the username and store it in Firebase if needed
    } catch (error) {
        console.error('Error signing up:', error);
        alert("Sign up failed: " + error.message);
    }
}

// Sign-In function
async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);
        // Redirect to profile page after login
        window.location.href = 'profile.html';  // Make sure this matches your actual profile page
    } catch (error) {
        console.error('Error signing in:', error);
        alert("Login failed: " + error.message);
    }
}

// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Handle Sign-Up form submission
    const signUpForm = document.getElementById('signup-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            const username = document.getElementById('signup-username').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            signUp(username, email, password); // Call sign-up function
        });
    }

    // Handle Login form submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            signIn(email, password); // Call sign-in function
        });
    }
});
