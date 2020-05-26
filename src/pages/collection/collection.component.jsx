import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";

import CollectionItem from "../../components/collection-item/collection-item.component";

// styled components:
import {
	CollectionPageContainer,
	CollectionItemsContainer,
	CollectionTitle,
} from "./collection.styles";

const CollectionPage = ({ collection }) => {
	return (
		<CollectionPageContainer>
			<CollectionTitle>
				{collection ? collection.title : null}{" "}
			</CollectionTitle>
			<CollectionItemsContainer>
				{collection
					? collection.items.map((item) => (
							<CollectionItem key={item.id} item={item} />
					  ))
					: null}
			</CollectionItemsContainer>
		</CollectionPageContainer>
	);
};

const mapStateToProps = (state, ownProps) => ({
	collection: selectCollection(ownProps.match.params.collectionId)(state), // currying technique
});

export default connect(mapStateToProps)(CollectionPage);
