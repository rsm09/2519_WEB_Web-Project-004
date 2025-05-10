import { auth, db,addDoc, onAuthStateChanged,doc,collection,getDoc} from "./firebase-config.js";

const postForm = document.getElementById("createPostForm");

onAuthStateChanged(auth, (user) => {
    if (user) {
        const userRef = doc(db, "users", user.uid);
        postForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const title = document.getElementById("postTitle").value;
            const caption = document.getElementById("postCaption").value;
            const hashtags = document.getElementById("postTags").value;
            const imageUrl = document.getElementById("postImage").value;

            try {
                const docSnap = await getDoc(userRef);
                const data = docSnap.data();
                console.log(data)
                await addDoc(collection(db, "posts"), {
                    userId: user.uid,
                    name:data.name,
                    profile:data.profilePic,
                    mail:data.email,
                    title,
                    caption,
                    hashtags,
                    imageUrl,  
                });
                window.location.href = "userspace.html"; // Redirect after creation
            } catch (err) {
                console.error("Error adding post:", err.message);
            }
        });
    } else {
        window.location.href = "index.html";
    }
});
