// ... (Keep your Firebase Config and Init)

let selectedRole = "";

function setRole(role) {
    // Match your Firestore Collection names exactly
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
            // Use the SAME field names you plan to query later
            return db.collection(selectedRole).doc(user.uid).set({
                name: name,
                email: email, // lowercase
                role: selectedRole
            });
        })
        .then(() => {
            alert("Account Created! ✅");
            window.location.href = "login.html";
        })
        .catch((error) => alert(error.message));
}

// ================= LOGIN =================
async function handleLogin() {
    const emailInput = document.getElementById("email").value.trim();
    const passInput = document.getElementById("pass").value.trim();

    if (!selectedRole) return alert("Please select a role.");

    try {
        // 1. Log in via Firebase Auth first (Secure way)
        const userCredential = await auth.signInWithEmailAndPassword(emailInput, passInput);
        const user = userCredential.user;

        // 2. Check if this specific user exists in the SELECTED collection
        const userDoc = await db.collection(selectedRole).doc(user.uid).get();

        if (userDoc.exists) {
            alert("Login Successful ✅");
            localStorage.setItem("userName", userDoc.data().name || "User");
            window.location.href = "dashboard.html";
        } else {
            // User exists in Auth, but not in this specific Role collection
            alert("Error: You do not have " + selectedRole + " permissions.");
            auth.signOut();
        }
    } catch (error) {
        alert(error.message); // Handles wrong password, user not found, etc.
    }
}