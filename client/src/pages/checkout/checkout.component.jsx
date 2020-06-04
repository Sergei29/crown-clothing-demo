import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import {
	selectCartItems,
	selectCartTotal,
} from "../../redux/cart/cart.selectors";

import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";

// styled components:
import {
	CheckoutPageContainer,
	CheckoutHeaderContainer,
	TotalContainer,
	HeaderBlockContainer,
	WarningContainer,
} from "./checkout.styles";

const CheckoutPage = ({ cartItems, total }) => {
	return (
		<CheckoutPageContainer>
			<CheckoutHeaderContainer>
				<HeaderBlockContainer>
					<span>Product</span>
				</HeaderBlockContainer>

				<HeaderBlockContainer>
					<span>Description</span>
				</HeaderBlockContainer>

				<HeaderBlockContainer>
					<span>Quantity</span>
				</HeaderBlockContainer>

				<HeaderBlockContainer>
					<span>Price</span>
				</HeaderBlockContainer>

				<HeaderBlockContainer>
					<span>Remove</span>
				</HeaderBlockContainer>
			</CheckoutHeaderContainer>
			{cartItems.map((cartItem) => (
				<CheckoutItem key={cartItem.id} cartItem={cartItem} />
			))}
			<TotalContainer>
				<span>TOTAL: ${total}</span>
			</TotalContainer>
			<WarningContainer>
				*Please use the following test credit card for payments*
				<br />
				Number: <code>4242424242424242</code> - Exp: <code>01/22</code>{" "}
				- CVC: <code>123</code>
			</WarningContainer>
			<StripeCheckoutButton price={total} />
		</CheckoutPageContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
