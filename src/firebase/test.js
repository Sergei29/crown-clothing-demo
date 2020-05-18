import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

// fetching data from firestore db:
firestore
	.collection("users")
	.doc("sCH0EHEp4gLal6YyKEnd")
	.collection("cardItems")
	.doc("lnp911mjMyGTMDjwOvKi");

// or alternatively to get the document:
firestore.doc("/users/sCH0EHEp4gLal6YyKEnd/cardItems/lnp911mjMyGTMDjwOvKi");

// or alternatively to get the collection `cardItems`:
firestore.doc("/users/sCH0EHEp4gLal6YyKEnd/cardItems");
