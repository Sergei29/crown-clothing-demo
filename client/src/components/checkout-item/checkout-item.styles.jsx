import styled from "styled-components";

const CheckoutItemContainer = styled.div`
	width: 100%;
	display: flex;
	min-height: 100px;
	border-bottom: 1px solid darkgrey;
	padding: 15px 0;
	font-size: 20px;
	align-items: center;
`;

const ImageContainer = styled.div`
	width: 23%;
	padding-right: 15px;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
`;

const NameContainer = styled.div`
	width: 23%;
`;

const QuantityContainer = styled.div`
	width: 23%;
	padding-left: 20px;
	display: flex;
	.arrow {
		cursor: pointer;
	}
	.value {
		margin: 0 10px;
	}
`;

const PriceContainer = styled.span`
	width: 23%;
`;

const RemoveButtonContainer = styled.span`
	padding-left: 12px;
	cursor: pointer;
`;

export {
	CheckoutItemContainer,
	ImageContainer,
	Image,
	NameContainer,
	QuantityContainer,
	PriceContainer,
	RemoveButtonContainer,
};
