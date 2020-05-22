import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
	// stripe needs the price to be in cents:
	const priceForStripe = price * 100;
	const publishableKey = "pk_test_DWQJz6PYuq0TflrK8gpg3hkV00dvcEYmsB";

	const onToken = (token) => {
		console.log(token);
		// with the real setting (later on) it will send token to our backend to authorize the payment
		// we shall just log it for now.
		alert("Payment successful.");
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
