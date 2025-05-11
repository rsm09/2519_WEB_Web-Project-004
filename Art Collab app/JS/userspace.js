import { auth, db,onAuthStateChanged,doc, getDoc,getDocs,collection,signOut,updateDoc,arrayUnion,query,where } from "./firebase-config.js";


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
                postData.id=doc.id
               loadpost(postData)
                
            });

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();

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
            <img src="${post.profile==""?`https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png`:post.profile}" class="post-user-pic">
            <div>
                <p class="post-user-name" onclick="show('${post.mail}')">${post.name}</p>
                <p class="post-title">${post.title}</p>
            </div>
        </div>
        <p class="post-caption">${post.caption}</p>
        <img src="${post.imageUrl}" class="post-image">
        <p class="post-hashtags">${post.hashtags}</p>
        <div class="comments-section">
            <div class="existing-comments" id="comment-${post.id}">
                ${post.comments?.map(c => `<p><strong>${c.username}</strong>: ${c.text}</p>`).join("") || ""}
            </div>
            <div class="comment-form">
                <input type="text" id="comment-input1-${post.id}" placeholder="Add a comment...">
                <button onclick="addComment('${post.id}')">Comment</button>
            </div>
        </div>
        `;

    postfeed.appendChild(feedDiv);
}

window.addComment = async (postId) => {
    const input = document.getElementById(`comment-input1-${postId}`);
    const commentText = input.value.trim();

    if (commentText === "") return;

    const user = auth.currentUser;
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const username = userDoc.data().name;

    const comment = {
        username,
        text: commentText,
    };

    const postRef = doc(db, "posts", postId);
    await updateDoc(postRef, {
        comments: arrayUnion(comment)
    });

    const commentContainer = document.getElementById(`comment-${postId}`);
    commentContainer.innerHTML += `<p><strong>${username}</strong>: ${commentText}</p>`;
    input.value = "";
};


window.show= async (mail)=>{
    console.log(mail)
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", "==", mail));
        const querySnapshot = await getDocs(q);
        let user = null;
        querySnapshot.forEach((doc) => {
        user = doc.data();
        });
        console.log(user)
        localStorage.removeItem("artist");
        localStorage.setItem("artist", JSON.stringify(user));
        
    window.location.href="showprofile.html"
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
