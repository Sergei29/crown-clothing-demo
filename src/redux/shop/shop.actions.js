import shopActionTypes from "./shop.types";
import {
	firestore,
	convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionsStart = (params) => ({
	type: shopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
	type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
	payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
	type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
	payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
	return (dispatch) => {
		// 1. dispatch fetch collection start
		dispatch(fetchCollectionsStart());
		// 2. fetch the data.then dispatch the action success OR fail
		firestore
			.collection("collections")
			.get()
			.then((snapshot) => {
				if (snapshot.empty) {
					throw new Error("Cannot fetch the data.");
				}
				const collectionsMap = convertCollectionsSnapshotToMap(
					snapshot
				);
				dispatch(fetchCollectionsSuccess(collectionsMap));
			})
			.catch((error) => {
				dispatch(fetchCollectionsFailure(error.message));
			});
	};
};
