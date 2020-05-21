import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectCollections } from "../../redux/shop/shop.selectors";

import CollectionPreview from "../../components/collection-preview/collection-preview.component";

import "./shop.styles.scss";

const ShopPage = ({ collections }) => (
	<div className="shop-page">
		{collections
			.filter((item, idx) => idx < 5)
			.map(({ id, ...otherCollectionProps }) => (
				<CollectionPreview key={id} {...otherCollectionProps} />
			))}
	</div>
);

const mapStateToProps = createStructuredSelector({
	collections: selectCollections,
});

export default connect(mapStateToProps)(ShopPage);
