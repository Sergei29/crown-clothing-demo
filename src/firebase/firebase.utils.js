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

// that function allows us to take user's object that we get from the auth library
// and then store inside our database: `userAuth` - is the object that we get from auth
// `additionalData` - the additional data object that we may need later for the signup functionality

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return; // if no user is authenticated just exit.
	const userRef = firestore.doc(`users/${userAuth.uid}`); //check if authenticated user uid already exists in our users/ collection
	const snapshot = await userRef.get();

	// so, if that user data doesn't exist in our collection, we shall create it as a new document:
	if (!snapshot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log("error creating user: ", error.message);
		}
	}

	return userRef;
};
