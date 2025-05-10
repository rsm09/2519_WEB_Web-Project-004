
// js/profile.js

// Listen for auth state
const artist = JSON.parse(localStorage.getItem("artist"));

document.getElementById("name").textContent = artist.name;
document.getElementById("Name").textContent = artist.name;
document.getElementById("Email").textContent = artist.email;
document.getElementById("Bio").textContent = artist.bio || "No bio added";
document.getElementById("Skills").textContent = artist.skills || "No skills listed";
document.getElementById("Image").src = artist.profilePic || "https://www.mauicardiovascularsymposium.com/wp-content/uploads/2019/08/dummy-profile-pic-300x300.png";


