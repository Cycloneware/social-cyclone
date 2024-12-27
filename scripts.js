// Ensure DOM elements are loaded before accessing them
document.addEventListener("DOMContentLoaded", () => {
    // Get DOM elements
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const logoutButton = document.getElementById('logout-btn');
    const authSection = document.getElementById('auth-section'); // Section containing login/signup forms
    const loggedInSection = document.getElementById('logged-in-section'); // Section displayed when logged in

    // Firebase authentication setup
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

    const firebaseConfig = {
        apiKey: "AIzaSyATIAdsKrwKein6PXQpyBB7WlUn6nzTlfM",
        authDomain: "social-cyclone.firebaseapp.com",
        projectId: "social-cyclone",
        storageBucket: "social-cyclone.appspot.com",
        messagingSenderId: "537484262670",
        appId: "1:537484262670:web:238408f9740b7576542b5f",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    // Listen for changes in authentication state
    onAuthStateChanged(auth, user => {
        if (user) {
            // User is logged in, hide auth section and show logged-in section
            if (authSection) authSection.style.display = 'none';
            if (loggedInSection) loggedInSection.style.display = 'block';

            // Add logout button functionality
            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    signOut(auth).then(() => {
                        // Redirect to the landing page
                        window.location.reload();
                    }).catch((error) => {
                        console.log("Error signing out:", error);
                    });
                });
            }
        } else {
            // No user is logged in, show auth section and hide logged-in section
            if (authSection) authSection.style.display = 'block';
            if (loggedInSection) loggedInSection.style.display = 'none';
        }
    });
});
