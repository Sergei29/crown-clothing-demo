import userActionTypes from "./user.types";

export const googleSignInStart = () => ({
	type: userActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (emailAndPassword) => ({
	type: userActionTypes.EMAIL_SIGN_IN_START,
	payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
	type: userActionTypes.SIGN_IN_SUCCESS,
	payload: user,
});

export const signInFailure = (errorMsg) => ({
	type: userActionTypes.SIGN_IN_FAILURE,
	payload: errorMsg,
});

export const checkUserSession = () => ({
	type: userActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
	type: userActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
	type: userActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (errorMsg) => ({
	type: userActionTypes.SIGN_OUT_FAILURE,
	payload: errorMsg,
});

export const signUpStart = (userCredentials) => ({
	type: userActionTypes.SIGN_UP_START,
	payload: userCredentials,
});

export const signUpSuccess = ({ user, additionalData }) => ({
	type: userActionTypes.SIGN_UP_SUCCESS,
	payload: { user, additionalData },
});

export const signUpFailure = (errorMsg) => ({
	type: userActionTypes.SIGN_UP_FAILURE,
	payload: errorMsg,
});
