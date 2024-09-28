import { createSlice } from "@reduxjs/toolkit";

// * State của popup
const initialPopupState = {
  isOpen: false,
  element: { type: null, data: null },
};
// todo khởi tạo createSlice cho popup
const popupSlide = new createSlice({
  name: "popup",
  initialState: initialPopupState,
  reducers: {
    //todo tạo các action cho popup
    SHOW_POPUP(state, action) {
      // * hiện popup
      state.isOpen = true;
      state.element = { ...action.payload };
      // console.log(action.payload);
    },
    HIDE_POPUP(state) {
      // * ẩn popup
      state.isOpen = false;
      state.element = { type: null, data: null };
    },
  },
});
export const popupAction = popupSlide.actions; //* export actions của popup để các component sử dụng được

export default popupSlide.reducer; //* export reducer của popup cho store
