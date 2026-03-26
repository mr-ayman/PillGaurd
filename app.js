// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "pillguard-app.firebaseapp.com",
    projectId: "pillguard-app",
    storageBucket: "pillguard-app.appspot.com",
    messagingSenderId: "ID",
    appId: "APP_ID"
};

// Initialize Firebase (Assuming Firebase SDK is loaded via CDN)
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.x/firebase-app.js";
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.x/firebase-auth.js";

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// Logic for Role-Based Registration
async function registerUser(email, password, role) {
    try {
        // 1. Create User in Auth
        // 2. Save "role" (Caretaker/Pharmacy) in Firestore under /users/{uid}
        console.log(`Registering as ${role}`);
        showScreen('dashboard');
    } catch (error) {
        alert(error.message);
    }
}

// Splash Screen Timer
setTimeout(() => {
    showScreen('onboarding');
}, 2500);