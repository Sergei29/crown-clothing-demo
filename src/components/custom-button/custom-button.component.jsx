import React from "react";

// styled components:
import { CustomButtonContainer } from "./custom-button.styles";

const CustomButton = (props) => {
	return (
		<CustomButtonContainer {...props}>
			{props.children}
		</CustomButtonContainer>
	);
};

export default CustomButton;
