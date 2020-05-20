import { createSelector } from "reselect";

// input selector - one type of selector: it takes state and returns some part of it
const selectCart = (state) => state.cart;

// another type of selector: CALLS createSelector() and takes 2 arguments -
// 1) a collection of input selectors
// 2) a function that returns the value we want of this selector in same order as we have listed
// the input selectors
// e.g
// const selectCart = (state) => state.cart;
// const selectCart = (state) => state.cart;
// const selectCartItems = createSelector(
//   [selectCart, selectUser],
//   (cart, user)=> {}
// );

export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
);

export const selectCartItemsCount = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce((count, cartItem) => count + cartItem.quantity, 0)
);
