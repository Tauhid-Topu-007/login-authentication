import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, getDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCeRFqmeyIunQjXrCZPFvsFCYgJpM4rWdo",
  authDomain: "authentication007-68710.firebaseapp.com",
  projectId: "authentication007-68710",
  storageBucket: "authentication007-68710.appspot.com",
  messagingSenderId: "445997059429",
  appId: "1:445997059429:web:930b6781ef5d7edf12a58c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  if (user) {
    const docRef = doc(db, "users", user.uid);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById('loggedUserFName').innerText = userData.firstName;
          document.getElementById('loggedUserLName').innerText = userData.lastName;
          document.getElementById('loggedUserEmail').innerText = userData.email;
        } else {
          console.log("No document found matching the ID!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  } else {
    console.log("No user is logged in");
    window.location.href = "login.html";
  }
});


const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  

  localStorage.removeItem('LoggedInUserId');
  

  signOut(auth)
    .then(() => {
      console.log("User signed out successfully");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
});
