import { auth, db,doc, getDoc, updateDoc,onAuthStateChanged  } from "./firebase-config.js";


const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
console.log(postId)
onAuthStateChanged(auth, async (user) => {
    if (user && postId) {
        const postRef = doc(db, "posts", postId);
        const postSnap = await getDoc(postRef);

        if (postSnap.exists() && postSnap.data().userId === user.uid) {
            const postData = postSnap.data();

            // Populate form
            document.getElementById("editTitle").value = postData.title;
            document.getElementById("editCaption").value = postData.caption;
            document.getElementById("editTags").value = postData.hashtags;
            document.getElementById("editImage").value = postData.imageUrl;

            document.getElementById("editPostForm").addEventListener("submit", async (e) => {
                e.preventDefault();
                try {
                    await updateDoc(postRef, {
                        title: document.getElementById("editTitle").value,
                        caption: document.getElementById("editCaption").value,
                        hashtags: document.getElementById("editTags").value,
                        imageUrl: document.getElementById("editImage").value,
                    });
                    alert("Post edited!");
                    window.location.href = "artpost.html"; 
                } catch (err) {
                    console.error("Error updating post:", err.message);
                }
            });
        } else {
            alert("You are not authorized to edit this post.");
            window.location.href = "dashboard.html";
        }
    } else {
        window.location.href = "index.html";
    }
});
