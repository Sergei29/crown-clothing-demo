import React, { Component } from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { signUpStart } from "../../redux/user/user.actions";

// styled components:
import { SignUpContainer, TitleContainer } from "./sign-up.styles";

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
		const { signUpStart } = this.props;

		if (password !== confirmPassword) {
			alert("passwords don't match.");
			return;
		}

		signUpStart({ email, password, displayName });
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
			<SignUpContainer>
				<TitleContainer>I do not have an account</TitleContainer>
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
			</SignUpContainer>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	signUpStart: (userCredentials) => dispatch(signUpStart(userCredentials)),
});

export default connect(null, mapDispatchToProps)(SignUp);
