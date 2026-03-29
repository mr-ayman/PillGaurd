// Firebase Configuration
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {

    apiKey: "AIzaSyCmIjp2u3gHt0oJnYKCT06uVpfouvEyTwQ",

    authDomain: "smartmedicinebox-a7732.firebaseapp.com",

    projectId: "smartmedicinebox-a7732",

    storageBucket: "smartmedicinebox-a7732.firebasestorage.app",

    messagingSenderId: "68004712451",

    appId: "1:68004712451:web:1470da33723e7e7b5f7e36",

    measurementId: "G-FE51N7RTWR"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
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