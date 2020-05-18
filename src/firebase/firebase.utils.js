import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
	apiKey: "AIzaSyCmZMAx_DLaYIok1o0wTlQ18FLyRo4BhD8",
	authDomain: "crown-clothing-c1f17.firebaseapp.com",
	databaseURL: "https://crown-clothing-c1f17.firebaseio.com",
	projectId: "crown-clothing-c1f17",
	storageBucket: "crown-clothing-c1f17.appspot.com",
	messagingSenderId: "176043280957",
	appId: "1:176043280957:web:b6c26e1ad5dd662169f854",
	measurementId: "G-3WS9WS1PXF",
};

firebase.initializeApp(config);

//export auth and store methods for the cases when needed:
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//set up google auth utility:
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account", // means we always want to have google popup to select google account to sign in with
});

//create and export sign in with google to be with popup:
export const signInWithGoogle = () => auth.signInWithPopup(provider);

//export full firebase library in case if needed:
export default firebase;
