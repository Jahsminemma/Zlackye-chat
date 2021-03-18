import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyBAv6q9W4ykMxpZfHZELRBHSZXPANoNCyM",
    authDomain: "slackye-db238.firebaseapp.com",
    projectId: "slackye-db238",
    storageBucket: "slackye-db238.appspot.com",
    messagingSenderId: "686988339191",
    appId: "1:686988339191:web:d5d292220b33ccc3c3b0f2",
    measurementId: "G-RJS49WTPRM"
  };
  // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics()
const db = firebaseApp.firestore()
const auth = firebase.auth()
const setfirebaseAuth = firebase.auth
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider, setfirebaseAuth};
export default db;
