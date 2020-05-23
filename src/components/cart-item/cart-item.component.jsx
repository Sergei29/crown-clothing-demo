import React from "react";

// styled components:
import {
	CartItemContainer,
	ImageContainer,
	ItemDetailsContainer,
	NameContainer,
} from "./cart-item.styles";

const CartItem = ({ item: { imageUrl, price, name, quantity } }) => {
	return (
		<CartItemContainer>
			<ImageContainer src={imageUrl} alt="item" />
			<ItemDetailsContainer>
				<NameContainer>{name}</NameContainer>
				<span className="price">
					{quantity} x ${price}
				</span>
			</ItemDetailsContainer>
		</CartItemContainer>
	);
};

export default CartItem;
