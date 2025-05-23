# 2519_WEB_Web-Project-004
# ArtCollab App

## Introduction
ART Collab is a creative social platform where artists can share their work, connect with fellow creators, and inspire each other. Users can create posts with titles, captions, hashtags, and optional images, interact through comments, and search content by hashtags or usernames. The app is designed with a clean and consistent UI to highlight artistic expression while being easy to use.

## Project Type
Frontend | Backend (Firebase)

## Deployed App
Frontend: https://artloopx.netlify.app/
Backend: Powered by Firebase  
Database: Firebase Firestore

## Directory Structure
Art Collab app/
|--CSS/
   |--All CSS files
|--JS/
   |--All JS files
|--All HTML files

## Video Walkthrough of the project
https://youtu.be/5iPBWYyTmCc

## Video Walkthrough of the codebase
https://youtu.be/sIUT9p07w0I

## Features
- User Authentication (Sign up, Log in, Log out)
- Create, edit, delete art posts
- Add captions, hashtags, images
- Comment on posts
- Global dashboard feed
- Create,edit Profile
- View other User Profile
- User-specific ArtPost section
- Responsive and clean UI with consistent color palette

## Design Decisions or Assumptions
- Used Firebase for backend to simplify hosting, auth, and database integration
- Chose plain HTML/CSS/JS for quick and easy UI setup without extra framework overhead
- Used normalized Firestore structure for posts and comments for scalability
- Prioritized minimalism in UI design to keep focus on artwork

## Installation & Getting Started
- To run locally, you can clone git repository
- Open index.html in brower directly
- To configure Firebase:
   Create a Firebase project
   Enable Firestore and Authentication (Email/Password)
   Create Firestore Database
   Replace config in firebase-config.js with your project credentials

## Usage
- Sign UP with Name, Email and Passowrd & Authenticate for Log In
- After log in you can access the Dasboard i.e. User's Space
![image](https://github.com/user-attachments/assets/3c46d65c-05e0-4049-8d50-81f432e9fe7a)
- You can View other user's art work in Global Feed
- You can Give feedback in comment section
- You can Create your art post by clicking on Create Post button.
- You Can Edit, Delete your post from artPost section
- You Can View other user's profile by click on their username from post
- You Can Edit your own profile by click on profile link.
- You Can sign out by clicking on signout button in footer.

## Credentials
Email: dummy@mail.com
Password: dummy1234

## APIs Used
Firebase Firestore for Backend Purpose
Firebase Auth for Authentication

## API Endpoints
Firebase Authentication methods:
 - createUserWithEmailAndPassword() – Registers a new user using email and password credentials.
 - signInWithEmailAndPassword() – Signs in an existing user with email and password.
 - onAuthStateChanged() – Listens for changes in the user’s authentication state (e.g., login/logout).
 - signOut() – Logs out the currently signed-in user.
Firebase Firestore methods:
 - setDoc() – Creates or replaces a document with a specific ID in a collection.
 - doc() – References a specific document inside a Firestore collection.
 - getDoc() – Retrieves a single document by its reference.
 - updateDoc() – Updates one or more fields in an existing document.
 - addDoc() – Adds a new document with an auto-generated ID to a Firestore collection.
 - collection() – Gets a reference to a Firestore collection.
 - query() – Builds a query with filters to retrieve specific documents from a collection.
 - where() – Adds a conditional filter to a Firestore query (e.g., where "username" == "rohit").
 - getDocs() – Retrieves all documents that match a query or are in a collection.
 - deleteDoc() – Permanently deletes a document from Firestore.
 - arrayUnion() – Adds an item to an array field in Firestore without duplicating existing values.

## Technology Stack
- HTML, CSS, JavaScript
- Firebase (Auth, Firestore)
- Git & GitHub for version control
- Netlify for hosting 
