// Import Firebase SDKs
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

// Your Firebase config (use the same as in previous scripts)
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
const usernameElement = document.getElementById('profile-username');
const emailElement = document.getElementById('profile-email');
const logoutBtn = document.getElementById('logout-btn');

// Check if user is logged in
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Display user info
        usernameElement.textContent = user.displayName || 'No username set';
        emailElement.textContent = user.email;

        // Enable log-out button
        logoutBtn.addEventListener('click', () => {
            signOut(auth).then(() => {
                window.location.href = 'index.html'; // Redirect to home page after logout
            }).catch((error) => {
                console.error('Error signing out:', error);
            });
        });
    } else {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
    }
});
