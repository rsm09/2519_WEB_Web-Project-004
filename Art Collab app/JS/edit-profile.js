import { auth, db, doc, updateDoc, onAuthStateChanged, getDoc } from "./firebase-config.js";

// Wait for user to be authenticated
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);

        // Pre-fill existing data
        try {
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                document.getElementById("name").value = data.name || "";
                document.getElementById("bio").value = data.bio || "";
                document.getElementById("skills").value = data.skills || "";
                document.getElementById("profilePic").value = data.profilePic || "";
            }
        } catch (err) {
            console.error("Failed to fetch user data:", err.message);
        }

        // Handle form submit
        document.getElementById("editProfileForm").addEventListener("submit", async (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const bio = document.getElementById("bio").value;
            const skills = document.getElementById("skills").value;
            const profilePic = document.getElementById("profilePic").value;

            try {
                await updateDoc(userRef, { name,bio, skills, profilePic });
                alert("Profile updated!");
                window.location.href = "userspace.html";
            } catch (err) {
                console.error("Error updating profile:", err.message);
            }
        });

    } else {
        // Redirect if not logged in
        window.location.href = "index.html";
    }
});
