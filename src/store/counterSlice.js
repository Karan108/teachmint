// counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    users: [],
    posts: [],
  },
  reducers: {
    updateUsers: (state, action) => {
      state.users = [...action.payload];
    },
    updatePosts: (state, action) => {
      state.posts = [...action.payload];
    },
  },
});

export const { updateUsers, updatePosts } = counterSlice.actions;
export default counterSlice.reducer;
