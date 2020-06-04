import React from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
	// stripe needs the price to be in cents:
	const priceForStripe = price * 100;
	const publishableKey = "pk_test_DWQJz6PYuq0TflrK8gpg3hkV00dvcEYmsB";

	const onToken = (token) => {
		axios({
			url: "/payment",
			method: "POST",
			data: {
				amount: priceForStripe,
				token,
			},
		})
			.then((response) => {
				alert("Payment successful");
				console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
				alert(
					"There was an issue with your payment. Please, make sure you are using the provided credit card."
				);
			});
	};

	return (
		<StripeCheckout
			label="Pay Now"
			name="CROWN Clothing Ltd."
			billingAddress
			shippingAddress
			image="https://sendeyo.com/up/d/f3eb2117da"
			description={`your total is $${price}`}
			amount={priceForStripe}
			panelLabel="Pay Now"
			token={onToken}
			stripeKey={publishableKey}
		/>
	);
};

export default StripeCheckoutButton;
