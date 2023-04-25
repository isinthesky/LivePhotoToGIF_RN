import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    video: null,
    gif: null,
  },
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    updateContent: (state, action) => {
      const { content, value } = action.payload;
      state.value[content] = value;
    },
    removeContent: (state, action) => {
      const { content } = action.payload;
      state.value[content] = null;
    },
  },
});

export const { updateContent, removeContent } = contentSlice.actions;

export default contentSlice.reducer;
