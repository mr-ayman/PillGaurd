// Firebase Config (Keep your existing config)
const firebaseConfig = {
    apiKey: "AIzaSyCmIjp2u3gHt0oJnYKCT06uVpfouvEyTwQ",
    authDomain: "smartmedicinebox-a7732.firebaseapp.com",
    databaseURL: "https://smartmedicinebox-a7732-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smartmedicinebox-a7732",
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const auth = firebase.auth();
const db = firebase.firestore();

let selectedRole = "";

// This function is called when a user clicks a role button
function setRole(role) {
    // Map the internal name to your Firestore collection names
    selectedRole = role === 'caretaker' ? 'Caretaker' : 'Pharmacy';

    document.getElementById('role-step').classList.add('hidden');
    document.getElementById('auth-step').classList.remove('hidden');
}

// ================= SIGNUP =================
function handleSignup() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    if (!selectedRole) return alert("Please select a role first");

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Save to the specific collection: Caretaker or Pharmacy
            return db.collection(selectedRole).doc(user.uid).set({
                name: name,
                email: email,
                role: selectedRole,
                createdAt: new Date()
            });
        })
        .then(() => {
            alert("Account Created in " + selectedRole + " ✅");
            window.location.href = "login.html";
        })
        .catch((error) => alert(error.message));
}

// ================= LOGIN =================
// This variable is set when the user clicks "As a CareTaker" or "As a Pharmacy"
let selectedRole = "";

function setRole(role) {
    // Matches your Firestore collection names exactly (Case-sensitive)
    selectedRole = role === 'caretaker' ? 'Caretaker' : 'Pharmacy';

    document.getElementById('role-step').classList.add('hidden');
    document.getElementById('auth-step').classList.remove('hidden');
}

async function handleLogin() {
    const emailInput = document.getElementById("email").value.trim();
    const passInput = document.getElementById("pass").value.trim();

    if (!selectedRole) {
        alert("Please select a role first.");
        return;
    }

    try {
        // 1. Reference the specific collection (Caretaker or Pharmacy)
        // 2. Query where 'Email' and 'Password' match the inputs
        const userQuery = await db.collection(selectedRole)
            .where("Email", "==", emailInput)
            .where("Password", "==", passInput)
            .get();

        if (!userQuery.empty) {
            // Success! We found a matching document
            alert("Login Successful ✅");

            // Optional: Save user info to localStorage to use on the dashboard
            const userData = userQuery.docs[0].data();
            localStorage.setItem("userName", userData.name || "User");
            localStorage.setItem("userRole", selectedRole);

            window.location.href = "dashboard.html";
        } else {
            // No matching document found
            alert("Invalid Email or Password for " + selectedRole + " ❌");
        }
    } catch (error) {
        console.error("Error logging in: ", error);
        alert("An error occurred. Please check your Firestore rules.");
    }
}