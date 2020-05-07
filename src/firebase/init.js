import firebase from 'firebase'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD7qKk3zlY1edjBZJHHl73ztk4cMGk7oFI",
    authDomain: "phonenumber-dc01a.firebaseapp.com",
    databaseURL: "https://phonenumber-dc01a.firebaseio.com",
    projectId: "phonenumber-dc01a",
    storageBucket: "phonenumber-dc01a.appspot.com",
    messagingSenderId: "773535931991",
    appId: "1:773535931991:web:5e40eb4367a04f7539cd12"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  export default firebaseApp.firestore()