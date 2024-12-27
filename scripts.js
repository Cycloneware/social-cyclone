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
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Sign Up Function
const signupForm = document.querySelector('form[action="#signup"]');
signupForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.querySelector('#signup-username').value;
  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User signed up successfully
      const user = userCredential.user;
      // You can add username to the user profile in Firebase Firestore if desired
      console.log('User Signed Up: ', user);
      alert('Sign up successful!');
      // You can redirect the user to another page or show them a welcome message
    })
    .catch((error) => {
      console.error(error);
      alert('Error: ' + error.message);
    });
});

// Login Function
const loginForm = document.querySelector('form[action="#login"]');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('User Logged In: ', user);
      alert('Login successful!');
      // Redirect to user's homepage or dashboard after login
    })
    .catch((error) => {
      console.error(error);
      alert('Error: ' + error.message);
    });
});

// Google Sign-In
function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  const credential = firebase.auth.GoogleAuthProvider.credential(id_token);

  auth.signInWithCredential(credential)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log('Google Sign-In Successful: ', user);
      alert('Google Sign-In successful!');
      // Redirect to another page or show dashboard
    })
    .catch((error) => {
      console.error(error);
      alert('Error: ' + error.message);
    });
}

// Sign Out Function
const signOutButton = document.getElementById('sign-out');
if (signOutButton) {
  signOutButton.addEventListener('click', function() {
    auth.signOut()
      .then(() => {
        alert('Successfully signed out!');
        window.location.reload(); // Optional: reload the page after sign out
      })
      .catch((error) => {
        console.error(error);
        alert('Error: ' + error.message);
      });
  });
}

// Monitoring Authentication State (optional)
auth.onAuthStateChanged(function(user) {
  if (user) {
    console.log('User is logged in: ', user);
  } else {
    console.log('No user is logged in');
  }
});
