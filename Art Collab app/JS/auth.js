// Sign up using email and password
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword,doc,setDoc,db } from "./firebase-config.js";
const signupForm = document.getElementById("signupForm");
if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                bio: "",
                skills: "",
                profilePic: ""
            });
            window.location.href = "index.html";
        } catch (error) {
            console.error(error.message);
        }
    });
}

// Login using email and password
const loginbtn= document.getElementById("loginbtn");
if (loginbtn) {
    loginbtn.addEventListener("click", async () => {
        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        try {
            let userCredential=await signInWithEmailAndPassword(auth, email, password);
            console.log("done")
            const user = userCredential.user;
            window.location.href = "userspace.html";
        } catch (error) {
            console.error(error.message);
        }
    });
}


