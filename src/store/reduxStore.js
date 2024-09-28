import { configureStore } from "@reduxjs/toolkit";
import popupReducer from "./popup";
import currentUserReducer from "./currentUser";
import cartReducer from "./cart";

// * thêm các reducer vào popup
const store = configureStore({
  reducer: {
    popup: popupReducer,
    currentUser: currentUserReducer,
    cart: cartReducer,
  },
});

export default store;
