import React, { useState } from "react";
import { connect } from "react-redux";
import {
	googleSignInStart,
	emailSignInStart,
} from "../../redux/user/user.actions";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// styled components:
import {
	SignInContainer,
	TitleContainer,
	ButtonsContainer,
} from "./sign-in.styles";

const SignIn = ({ googleSignInStart, emailSignInStart }) => {
	const [userCredentials, setCredentials] = useState({
		email: "",
		password: "",
	});

	const { email, password } = userCredentials;

	const handleSubmit = (e) => {
		e.preventDefault();
		emailSignInStart(email, password);
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<SignInContainer>
			<TitleContainer>I already have an account</TitleContainer>
			<span>Sign in with your email and password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					type="email"
					name="email"
					value={email}
					required
					handleChange={handleChange}
					label="Email"
				/>

				<FormInput
					type="password"
					name="password"
					value={password}
					required
					handleChange={handleChange}
					label="Password"
				/>
				<ButtonsContainer>
					<CustomButton type="submit">Sign in</CustomButton>
					<CustomButton
						type="button"
						onClick={googleSignInStart}
						isGoogleSignIn
					>
						Sign in with Google
					</CustomButton>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

const mapDispatchToProps = (dispatch) => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) =>
		dispatch(emailSignInStart({ email, password })),
});
export default connect(null, mapDispatchToProps)(SignIn);
