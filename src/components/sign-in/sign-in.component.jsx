import React, { Component } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

// styled components:
import {
	SignInContainer,
	TitleContainer,
	ButtonsContainer,
} from "./sign-in.styles";

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};
	}

	handleSubmit = async (event) => {
		const { email, password } = this.state;
		event.preventDefault();
		// auth with firebase
		try {
			await auth.signInWithEmailAndPassword(email, password);
			this.setState({
				email: "",
				password: "",
			});
		} catch (error) {
			console.log("error sign in: ", error.message);
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		return (
			<SignInContainer>
				<TitleContainer>I already have an account</TitleContainer>
				<span>Sign in with your email and password</span>
				<form onSubmit={this.handleSubmit}>
					<FormInput
						type="email"
						name="email"
						value={this.state.email}
						required
						handleChange={this.handleChange}
						label="Email"
					/>

					<FormInput
						type="password"
						name="password"
						value={this.state.password}
						required
						handleChange={this.handleChange}
						label="Password"
					/>
					<ButtonsContainer>
						<CustomButton type="submit">Sign in</CustomButton>
						<CustomButton
							type="button"
							onClick={signInWithGoogle}
							isGoogleSignIn
						>
							Sign in with Google
						</CustomButton>
					</ButtonsContainer>
				</form>
			</SignInContainer>
		);
	}
}

export default SignIn;
