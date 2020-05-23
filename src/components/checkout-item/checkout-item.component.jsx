import React from "react";
import { connect } from "react-redux";

import {
	addItem,
	removeItem,
	clearItemFromCart,
} from "../../redux/cart/cart.actions";

// styled components:
import {
	CheckoutItemContainer,
	ImageContainer,
	Image,
	NameContainer,
	QuantityContainer,
	PriceContainer,
	RemoveButtonContainer,
} from "./checkout-item.styles";

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<CheckoutItemContainer>
			<ImageContainer>
				<Image src={imageUrl} alt="item" />
			</ImageContainer>
			<NameContainer>{name}</NameContainer>
			<QuantityContainer>
				<div className="arrow" onClick={() => removeItem(cartItem)}>
					{" "}
					&#10094;{" "}
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={() => addItem(cartItem)}>
					{" "}
					&#10095;{" "}
				</div>
			</QuantityContainer>
			<PriceContainer>{price}</PriceContainer>
			<RemoveButtonContainer onClick={() => clearItem(cartItem)}>
				&#10005;
			</RemoveButtonContainer>
		</CheckoutItemContainer>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addItem(item)),
	clearItem: (item) => dispatch(clearItemFromCart(item)),
	removeItem: (id) => dispatch(removeItem(id)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
