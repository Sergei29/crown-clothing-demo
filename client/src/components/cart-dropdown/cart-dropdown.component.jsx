import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import CartItem from "../cart-item/cart-item.component";

// styled components:
import {
	CartDropdownContainer,
	CartItemsContainer,
	EmptyMessageContainer,
	CheckoutButtonContainer,
} from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, history, toggleCartHidden }) => {
	return (
		<CartDropdownContainer>
			<CartItemsContainer>
				{cartItems.length > 0 ? (
					cartItems.map((item) => (
						<CartItem key={item.id} item={item} />
					))
				) : (
					<EmptyMessageContainer>
						Your cart is empty
					</EmptyMessageContainer>
				)}
			</CartItemsContainer>
			<CheckoutButtonContainer
				onClick={() => {
					toggleCartHidden();
					history.push("/checkout");
				}}
			>
				GO TO CHECKOUT
			</CheckoutButtonContainer>
		</CartDropdownContainer>
	);
};

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default compose(
	withRouter,
	connect(mapStateToProps, mapDispatchToProps)
)(CartDropdown);
