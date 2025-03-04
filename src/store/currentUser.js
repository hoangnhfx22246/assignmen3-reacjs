import { createSlice } from "@reduxjs/toolkit";
import {
  getCurrentUser,
  getCurrentTokenUser,
  getExpireAtAuth,
  setCurrentTokenUser,
  setCurrentUser,
  setExpireAtAuth,
} from "../localStorage/currentUser";

const initialCurrentUserState = {
  currentUser: getCurrentUser(),
  token: getCurrentTokenUser(),
  expireAt: getExpireAtAuth(),
  isAuthenticated: !!getCurrentUser(),
};
const currentUserSlide = new createSlice({
  name: "currentUser",
  initialState: initialCurrentUserState,
  reducers: {
    //todo tạo các action
    ON_LOGIN(state, action) {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      state.expireAt = action.payload.expireAt;
      state.isAuthenticated = true;
      setCurrentUser(action.payload.user);
      setCurrentTokenUser(action.payload.token);
      setExpireAtAuth(action.payload.expireAt);
    },
    ON_LOGOUT(state) {
      state.currentUser = null;
      state.token = null;
      state.expireAt = null;
      state.isAuthenticated = false;

      setCurrentUser(null);
      setCurrentTokenUser(null);
      setExpireAtAuth(null);
    },
  },
});

export const currentUserAction = currentUserSlide.actions; //* export actions
export default currentUserSlide.reducer;
