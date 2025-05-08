// js/profile.js
import { auth, db, setDoc, doc,getDoc,onAuthStateChanged } from "./firebase-config.js";


// Listen for auth state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userDoc = doc(db, "users", user.uid);
            const docSnapshot = await getDoc(userDoc);
            const userData = docSnapshot.data();

            if (userData) {
                document.getElementById("userName").textContent = userData.name;
                document.getElementById("userEmail").textContent = userData.email;
                document.getElementById("userBio").textContent = userData.bio || "No bio added";
                document.getElementById("userSkills").textContent = userData.skills || "No skills listed";
                document.getElementById("profileImage").src = userData.profilePic || "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png";
            }
        } catch (err) {
            console.error("Error fetching user data:", err.message);
        }
    } else {
        // Not logged in — redirect to login page
        window.location.href = "index.html.html";
    }
});

// Redirect to edit-profile.html
document.getElementById("editProfileBtn").addEventListener("click", () => {
    window.location.href = "edit-profile.html";
});
