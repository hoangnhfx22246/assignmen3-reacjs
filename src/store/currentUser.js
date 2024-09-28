import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "../localStorage/currentUser";

const initialCurrentUserState = {
  currentUser: getCurrentUser(),
};
const currentUserSlide = new createSlice({
  name: "currentUser",
  initialState: initialCurrentUserState,
  reducers: {
    //todo tạo các action
    ON_LOGIN(state, action) {
      state.currentUser = action.payload;
    },
    ON_LOGOUT(state) {
      state.currentUser = null;
    },
  },
});

export const currentUserAction = currentUserSlide.actions; //* export actions
export default currentUserSlide.reducer;
