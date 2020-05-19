import React, { Component } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import "./sign-up.styles.scss";

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
		};
	}

	handleSubmit = async (event) => {
		event.preventDefault();
		// auth sign up with firebase:
		const { displayName, email, password, confirmPassword } = this.state;

		if (password !== confirmPassword) {
			alert("passwords don't match.");
			return;
		}

		try {
			//create user with email and password
			const { user } = await auth.createUserWithEmailAndPassword(
				email,
				password
			);

			//save user to db:
			await createUserProfileDocument(user, { displayName });

			// reset state to initial values
			this.setState({
				displayName: "",
				email: "",
				password: "",
				confirmPassword: "",
			});
		} catch (error) {
			console.log(error);
		}
	};

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		const { displayName, email, password, confirmPassword } = this.state;
		return (
			<div className="sign-up">
				<h2 className="title">I do not have an account</h2>
				<span>Sign up with your email and password</span>
				<form onSubmit={this.handleSubmit} className="sign-up-form">
					<FormInput
						type="text"
						name="displayName"
						value={displayName}
						required
						handleChange={this.handleChange}
						label="Display Name"
					/>
					<FormInput
						type="email"
						name="email"
						value={email}
						required
						handleChange={this.handleChange}
						label="Email"
					/>
					<FormInput
						type="password"
						name="password"
						value={password}
						required
						handleChange={this.handleChange}
						label="Password"
					/>
					<FormInput
						type="password"
						name="confirmPassword"
						value={confirmPassword}
						required
						handleChange={this.handleChange}
						label="Confirm password"
					/>
					<CustomButton type="submit">SIGN UP</CustomButton>
				</form>
			</div>
		);
	}
}

export default SignUp;
