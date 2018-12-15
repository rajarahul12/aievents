import firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4cghdsFv0qLJDFqzA9oPw_n2JR8Asb5g",
  authDomain: "aievents.firebaseapp.com",
  databaseURL: "https://aievents.firebaseio.com",
  projectId: "aievents",
  storageBucket: "aievents.appspot.com",
  messagingSenderId: "730949964762"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);
export default firebase;
