import React from "react";
import { withRouter } from "react-router-dom";
import "./menu-item.styles.scss";

// styled components:
import {
	MenuItemContainer,
	BackgroundImageContainer,
	ContentContainer,
	TitleContainer,
	SubTitleContainer,
} from "./menu-item.styles";

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
	return (
		<MenuItemContainer
			size={size}
			onClick={() => history.push(`${match.url}${linkUrl}`)}
		>
			<BackgroundImageContainer imageUrl={imageUrl} />

			<ContentContainer>
				<TitleContainer>{title.toUpperCase()}</TitleContainer>
				<SubTitleContainer>SHOP NOW</SubTitleContainer>
			</ContentContainer>
		</MenuItemContainer>
	);
};

export default withRouter(MenuItem);
