import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  cart: {
    listCart: JSON.parse(localStorage.getItem("listCart")) || [],
  },
};
// todo khởi tạo createSlice cho popup
const cartSlice = new createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    ADD_CART(state, action) {
      //action.payload là 1 object cart
      const existingProduct = state.cart.listCart.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        state.cart.listCart = state.cart.listCart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        state.cart.listCart.push(action.payload);
      }

      // Cập nhật localStorage sau khi thay đổi state
      localStorage.setItem("listCart", JSON.stringify(state.cart.listCart));
    },
    UPDATE_CART(state, action) {
      //action.payload là 1 object cart
      state.cart.listCart = state.cart.listCart.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      // Cập nhật localStorage sau khi thay đổi state
      localStorage.setItem("listCart", JSON.stringify(state.cart.listCart));
    },
    DELETE_CART(state, action) {
      //action.payload là id của cart
      state.cart.listCart = state.cart.listCart.filter(
        (item) => item.id !== action.payload
      );

      // Cập nhật localStorage sau khi thay đổi state
      localStorage.setItem("listCart", JSON.stringify(state.cart.listCart));
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer; //* export reducer của popup cho store
