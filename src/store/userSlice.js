import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: false,
  messages: [],
  user: {},
};

const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    sendMessage(state, action) {
      const newMsg = action.payload;
      state.messages.push(newMsg);
    },
    login(state, action) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logout(state) {
      state.user = {};
      state.isAuth = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
