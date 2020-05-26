import React, { Component } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import {
	firestore,
	convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { updateCollections } from "../../redux/shop/shop.actions";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends Component {
	state = {
		loading: true,
	};

	unsubscribeFromSnapshot = null;

	componentDidMount() {
		const { updateCollections } = this.props;
		// subscribe to and fetch our shop data:
		const collectionRef = firestore.collection("collections");
		this.unsubscribeFromSnapshot = collectionRef.onSnapshot(
			async (snapshot) => {
				//get collections data from collections snapshot:
				const collectionsMap = await convertCollectionsSnapshotToMap(
					snapshot
				);

				//save new collections data to redux store:
				updateCollections(collectionsMap);
				this.setState({ loading: false });
			}
		);
	}

	componentWillUnmount() {
		this.unsubscribeFromSnapshot();
	}

	render() {
		const { match } = this.props;
		const { loading } = this.state;
		return (
			<div className="shop-page">
				<Route
					exact
					path={`${match.path}`}
					render={(props) => (
						<CollectionsOverviewWithSpinner
							isLoading={loading}
							{...props}
						/>
					)}
				/>

				<Route
					exact
					path={`${match.path}/:collectionId`}
					render={(props) => (
						<CollectionPageWithSpinner
							isLoading={loading}
							{...props}
						/>
					)}
				/>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => ({
	updateCollections: (collections) =>
		dispatch(updateCollections(collections)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
