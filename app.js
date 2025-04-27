import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,signOut,signInWithPopup,GoogleAuthProvider, 
    onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"; 
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
  const firebaseConfig = {
    apiKey: "AIzaSyC4qTooEWBBvPCvwSbR5LUtARJ2BjDMxPQ",
    authDomain: "authentication-e94fa.firebaseapp.com",
    databaseURL: "https://authentication-e94fa-default-rtdb.firebaseio.com",
    projectId: "authentication-e94fa",
    storageBucket: "authentication-e94fa.firebasestorage.app",
    messagingSenderId: "300172626676",
    appId: "1:300172626676:web:5fd5e606d63b36ada7eca1",
    measurementId: "G-68DNGNSED5"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  

  // Initialize Firebase
  const auth = getAuth(app); 
const provider = new GoogleAuthProvider(); 

 
// Sign Up with Email/Password 
document.getElementById("signup-btn")?.addEventListener("click", () => { 
  const email = document.getElementById("signup-email").value; 
  const password = document.getElementById("signup-password").value; 
 
  createUserWithEmailAndPassword(auth, email, password) 
    .then(() => { 
      alert("Sign Up Successful!"); 
      window.location.href = "todo.html"; 
    }) 
    .catch((error) => { 
      alert(error.message); 
    }); 
}); 
 
// Login with Email/Password 
document.getElementById("login-btn")?.addEventListener("click", () => { 
  const email = document.getElementById("login-email").value; 
  const password = document.getElementById("login-password").value; 
 
  signInWithEmailAndPassword(auth, email, password) 
    .then(() => { 
      alert("Login Successful!"); 
      window.location.href = "todo.html"; 
    }) 
    .catch((error) => { 
      alert(error.message); 
    }); 
}); 
 
 
// Continue with Google 
document.getElementById("google-btn")?.addEventListener("click", () => { 
  signInWithPopup(auth, provider) 
    .then(() => { 
      alert("Login Successful!"); 
      window.location.href = "todo.html"; 
    }) 
    .catch((error) => { 
      alert(error.message);
    }); 
  }); 
  // Logout 
document.getElementById("logout-btn")?.addEventListener("click", () => { 
  signOut(auth) 
    .then(() => { 
      alert("Logged Out Successfully!"); 
      window.location.href = "index.html"; 
    }) 
    .catch((error) => { 
      alert(error.message); 
    }); 
}); 
 
// Show User Email on Welcome Page 
onAuthStateChanged(auth, (user) => { 
  if (user && window.location.pathname.includes("todo.html")) { 
    document.getElementById("user-email").textContent = user.email; 
  } else if (!user && window.location.pathname.includes("todo.html")) { 
    window.location.href = "index.html"; 
  } 
});


