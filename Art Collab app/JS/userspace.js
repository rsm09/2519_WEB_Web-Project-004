import { auth, db,onAuthStateChanged,doc, getDoc,getDocs,collection,signOut } from "./firebase-config.js";

// Wait for auth state
let postfeed=document.getElementById("postFeed")
onAuthStateChanged(auth, async (user) => {
    if (user) {
        try {
            const userDocRef = doc(db, "users", user.uid);
            const userDocSnap = await getDoc(userDocRef);

            const postsRef = collection(db, "posts");
            const allpost = await getDocs(postsRef );
            allpost.forEach(doc => {
                let postData=doc.data()
               loadpost(postData)
                
            });

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();

                // Update DOM elements
                document.getElementById("dashboardTitle").textContent = `${userData.name}'s Space`;
                document.getElementById("dashboardProfilePic").src = userData.profilePic || "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png";
                document.getElementById("dashboardSkills").textContent = userData.skills || "No skills added";
                document.getElementById("dashboardBio").textContent = userData.bio || "No bio provided.";
            }
        } catch (err) {
            console.error("Failed to load dashboard data:", err.message);
        }
    } else {
        window.location.href = "index.html";
    }
});


function loadpost(post) {
    const feedDiv = document.createElement("div");
    feedDiv.className="post";
    
    feedDiv.innerHTML=` <div class="post-header">
            <img src="${post.profile}" class="post-user-pic">
            <div>
                <p class="post-user-name">${post.name}</p>
                <p class="post-title">${post.title}</p>
            </div>
        </div>
        <p class="post-caption">${post.caption}</p>
        <img src="${post.imageUrl}" class="post-image">
        <p class="post-hashtags">${post.hashtags}</p>
        <div class="comments-section">
            <div class="existing-comments" id="comments-${post.id}">
                ${post.comments?.map(c => `<p><strong>${c.username}</strong>: ${c.text}</p>`).join("") || ""}
            </div>
            <div class="comment-form">
                <input type="text" id="comment-input-${post.id}" placeholder="Add a comment...">
                <button onclick="addComment('${post.id}')">Comment</button>
            </div>
        </div>
        `;

    postfeed.appendChild(feedDiv);
}


document.getElementById("signoutBtn").addEventListener("click", () => {
    signOut(auth)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Sign out error:", error.message);
        });
});