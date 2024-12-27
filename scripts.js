document.addEventListener("DOMContentLoaded", () => {
    // Check if Firebase is available
    if (typeof firebase === "undefined") {
        console.error("Firebase SDK not loaded. Ensure Firebase scripts are included before this script.");
        return;
    }

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
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const auth = firebase.auth();

    // DOM elements
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const authSection = document.getElementById('auth-section');
    const loggedInSection = document.getElementById('logged-in-section');
    const logoutButton = document.getElementById('logout-btn');

    // Listen for authentication state changes
    auth.onAuthStateChanged(user => {
        if (user) {
            // User is logged in
            if (authSection) authSection.style.display = 'none';
            if (loggedInSection) loggedInSection.style.display = 'block';

            // Handle logout button
            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    auth.signOut()
                        .then(() => window.location.reload())
                        .catch(error => console.error("Error signing out:", error));
                });
            }
        } else {
            // No user is logged in
            if (authSection) authSection.style.display = 'block';
            if (loggedInSection) loggedInSection.style.display = 'none';

            // Handle signup form submission
            if (signupForm) {
                signupForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = document.getElementById('signup-email').value.trim();
                    const password = document.getElementById('signup-password').value.trim();

                    auth.createUserWithEmailAndPassword(email, password)
                        .then(userCredential => {
                            console.log("User signed up:", userCredential.user);
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error("Error signing up:", error.message);
                        });
                });
            }

            // Handle login form submission
            if (loginForm) {
                loginForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const email = document.getElementById('login-email').value.trim();
                    const password = document.getElementById('login-password').value.trim();

                    auth.signInWithEmailAndPassword(email, password)
                        .then(userCredential => {
                            console.log("User logged in:", userCredential.user);
                            window.location.reload();
                        })
                        .catch(error => {
                            console.error("Error logging in:", error.message);
                        });
                });
            }
        }
    });
});
