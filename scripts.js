// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged, updateProfile, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

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

// Get DOM elements
const logoutButton = document.getElementById('logout-btn');
const changeUsernameForm = document.getElementById('change-username-form');
const currentUsernameDisplay = document.getElementById('current-username');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Handle user sign-out
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        window.location.href = 'index.html'; // Redirect to the landing page
    }).catch((error) => {
        console.log("Error signing out:", error);
    });
});

// Listen for changes in authentication state
onAuthStateChanged(auth, user => {
    if (user) {
        // Display the current username
        currentUsernameDisplay.textContent = user.displayName || "No username set";
        
        // Show the username change form
        changeUsernameForm.style.display = 'block';

        // Handle form submission for username change
        changeUsernameForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const newUsername = document.getElementById('new-username').value.trim();

            if (newUsername) {
                // Update the user's display name (username)
                updateProfile(user, {
                    displayName: newUsername
                }).then(() => {
                    // Success: Update the displayed username and show success message
                    currentUsernameDisplay.textContent = newUsername;
                    successMessage.style.display = 'block';
                    errorMessage.style.display = 'none';
                }).catch((error) => {
                    // Error handling
                    errorMessage.textContent = "Error updating username: " + error.message;
                    errorMessage.style.display = 'block';
                    successMessage.style.display = 'none';
                });
            }
        });
    } else {
        // Redirect to the login page if no user is logged in
        window.location.href = 'index.html';
    }
});
