// Import Firebase App and Firebase Authentication
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Your Firebase config object
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

// Example function to sign in user
async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in:', userCredential.user);

        // Redirect to the profile page upon successful login
        window.location.href = 'profile.html';  // Change this to the actual URL of the profile page
    } catch (error) {
        console.error('Error signing in:', error);
        alert("Login failed: " + error.message);
    }
}

// Handling the form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    signIn(email, password); // Call the signIn function
});
