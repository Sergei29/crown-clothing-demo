import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

// styled components:
import {
	CollectionItemContainer,
	ImageContainer,
	CollectionFooterContainer,
	NameContainer,
	PriceContainer,
	CustomButtonContainer,
} from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
	const { name, imageUrl, price } = item;
	return (
		<CollectionItemContainer>
			<ImageContainer imageUrl={imageUrl} />
			<CollectionFooterContainer>
				<NameContainer>{name}</NameContainer>
				<PriceContainer>{price}</PriceContainer>
			</CollectionFooterContainer>
			<CustomButtonContainer inverted onClick={() => addItem(item)}>
				ADD TO CART
			</CustomButtonContainer>
		</CollectionItemContainer>
	);
};

const mapDispatchToProps = (dispatch) => ({
	addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
