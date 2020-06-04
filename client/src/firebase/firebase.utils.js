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
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: "select_account", // means we always want to have google popup to select google account to sign in with
});

//create and export sign in with google to be with popup:
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

//export full firebase library in case if needed:
export default firebase;

// that function allows us to create a new user and get its reference or if exists get its reference;
// function takes as args: user's object that we get from the auth library
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

export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = firestore.collection(collectionKey);

	const batch = firestore.batch();
	objectsToAdd.forEach((obj) => {
		//inside each of our collection, we create a new blank doc with automatically generated id
		const newDocRef = collectionRef.doc();

		// now we loop through objectsToAdd array and batch all .set() calls together
		batch.set(newDocRef, obj);
	});
	try {
		await batch.commit();
	} catch (error) {
		console.log(error);
	}
};

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
	const transformedCollections = collectionsSnapshot.docs.map((doc) => {
		const { title, items } = doc.data();

		return {
			title,
			items,
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
		};
	});

	return transformedCollections.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection;
		return accumulator;
	}, {});
};

export const getCurrentUser = () => {
	return new Promise((resolve, reject) => {
		const unsubscribe = auth.onAuthStateChanged((userAuth) => {
			unsubscribe();
			resolve(userAuth);
		}, reject);
	});
};
