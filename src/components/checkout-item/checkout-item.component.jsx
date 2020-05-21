import React from "react";
import { connect } from "react-redux";

import {
	addItem,
	removeItem,
	clearItemFromCart,
} from "../../redux/cart/cart.actions";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;
	return (
		<div className="checkout-item">
			<div className="image-container">
				<img src={imageUrl} alt="item" />
			</div>
			<span className="name">{name}</span>
			<span className="quantity">
				<div className="arrow" onClick={() => removeItem(cartItem)}>
					{" "}
					&#10094;{" "}
				</div>
				<span className="value">{quantity}</span>
				<div className="arrow" onClick={() => addItem(cartItem)}>
					{" "}
					&#10095;{" "}
				</div>
			</span>
			<span className="price">{price}</span>
			<span className="remove-button" onClick={() => clearItem(cartItem)}>
				&#10005;
			</span>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addItem(item)),
	clearItem: (item) => dispatch(clearItemFromCart(item)),
	removeItem: (id) => dispatch(removeItem(id)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
