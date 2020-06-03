import React, { useState } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signUpStart } from "../../redux/user/user.actions";

// styled components:
import { SignUpContainer, TitleContainer } from "./sign-up.styles";

const SignUp = ({ signUpStart }) => {
	const [userCredentials, setUserCredentials] = useState({
		displayName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { displayName, email, password, confirmPassword } = userCredentials;

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("passwords don't match.");
			return;
		}

		signUpStart({ email, password, displayName });
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setUserCredentials({ ...userCredentials, [name]: value });
	};

	return (
		<SignUpContainer>
			<TitleContainer>I do not have an account</TitleContainer>
			<span>Sign up with your email and password</span>
			<form onSubmit={handleSubmit} className="sign-up-form">
				<FormInput
					type="text"
					name="displayName"
					value={displayName}
					required
					handleChange={handleChange}
					label="Display Name"
				/>
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
				<FormInput
					type="password"
					name="confirmPassword"
					value={confirmPassword}
					required
					handleChange={handleChange}
					label="Confirm password"
				/>
				<CustomButton type="submit">SIGN UP</CustomButton>
			</form>
		</SignUpContainer>
	);
};

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
