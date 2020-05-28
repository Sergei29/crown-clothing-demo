import shopActionTypes from "./shop.types";

const INITIAL_STATE = {
	collections: null,
	isFetching: false,
	errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case shopActionTypes.FETCH_COLLECTIONS_START:
			return {
				...state,
				isFetching: true,
			};
		case shopActionTypes.FETCH_COLLECTIONS_FAILURE:
			return {
				...state,
				isFetching: false,
				errorMessage: action.payload,
			};
		case shopActionTypes.FETCH_COLLECTIONS_SUCCESS:
			return {
				...state,
				collections: action.payload,
				isFetching: false,
			};
		default:
			return state;
	}
};

export default shopReducer;
