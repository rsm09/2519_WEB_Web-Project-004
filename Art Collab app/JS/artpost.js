import {
    auth,
    db,
    collection,
    query,
    where,
    getDocs,
    doc,
    getDoc,
    deleteDoc,
    onAuthStateChanged,
    updateDoc,
    arrayUnion,
} from "./firebase-config.js";

// Reference to post container
const postContainer = document.getElementById("myPosts");


// Listen for auth state
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const postsRef = collection(db, "posts");
        const q = query(postsRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userDoc = doc(db, "users", user.uid);
        const docSnapshot = await getDoc(userDoc);
        const userData = docSnapshot.data();

        if (docSnapshot.exists()) {
            const userData = docSnapshot.data();

            // Update DOM elements
            document.getElementById("dashboardTitle").textContent = `${userData.name}'s Space`;
            document.getElementById("dashboardProfilePic").src = userData.profilePic || "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png";
            document.getElementById("dashboardSkills").textContent = userData.skills || "No skills added";
            document.getElementById("dashboardBio").textContent = userData.bio || "No bio provided.";
        }
        querySnapshot.forEach((docSnap) => {
            const post = docSnap.data();
            post.id = docSnap.id;
            displayPost(post, userData);
        });
    } else {
        window.location.href = "index.html";
    }
});

// Display user post
function displayPost(post, userData) {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    
    postDiv.innerHTML = `
        <div class="post-header">
            <img src="${userData.profilePic || 'https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png'}" class="post-user-pic">
            <div>
                <p class="post-user-name">${userData.name}</p>
                <p class="post-title">${post.title}</p>
            </div>
        </div>
        <p class="post-caption">${post.caption}</p>
        <img src="${post.imageUrl}" class="post-image">
        <p class="post-hashtags">${post.hashtags}</p>

        <div class="post-actions">
            <button onclick="editPost('${post.id}')">Edit</button>
            <button onclick="deletePost('${post.id}')">Delete</button>
        </div>
    `;

    postContainer.appendChild(postDiv);
    
}

// Delete post
window.deletePost = async (postId) => {
    if (confirm("Are you sure you want to delete this post?")) {
        await deleteDoc(doc(db, "posts", postId));
        location.reload();
    }
};

// Redirect to edit post page with post ID
window.editPost = (postId) => {
    window.location.href = `edit-post.html?id=${postId}`;
};



document.getElementById("signoutBtn").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            alert("You are sign-out successfully...!")
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Sign out error:", error.message);
        });
});

