import firebase from "firebase";


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCPPFGbHHURopnDyBAg1MPSHJYT9Cq3gKY",
    authDomain: "auth-9b870.firebaseapp.com",
    projectId: "auth-9b870",
    storageBucket: "auth-9b870.appspot.com",
    messagingSenderId: "343833548064",
    appId: "1:343833548064:web:bb04d5b8427063497bf345"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;