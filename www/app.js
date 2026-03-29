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
function handleLogin() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("pass").value;

    if (!selectedRole) return alert("Please select a role first");

    auth.signInWithEmailAndPassword(email, password)
        .then(async(userCredential) => {
            const user = userCredential.user;

            // Look for the user's UID in the collection matching their selected role
            const doc = await db.collection(selectedRole).doc(user.uid).get();

            if (doc.exists) {
                alert("Logged in as " + selectedRole + " ✅");
                window.location.href = "dashboard.html";
            } else {
                alert("Error: You are not registered as a " + selectedRole);
                auth.signOut(); // Kick them out if they are in the wrong role
            }
        })
        .catch((error) => alert(error.message));
}