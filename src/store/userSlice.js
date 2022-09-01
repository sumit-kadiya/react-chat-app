import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuth: false,
  messages: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialAuthState,
  reducers: {
    sendMessage(state, action) {
      const newMsg = action.payload;
      state.messages.push(newMsg);
    },
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
