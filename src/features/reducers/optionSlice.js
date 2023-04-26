import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    Scale: 50,
    FPS: 10,
    Speed: 1,
    Flip: false,
    Mirror: false,
    width: 0,
    height: 0,
  },
};

export const optionSlice = createSlice({
  name: "option",
  initialState,
  reducers: {
    updateValue: (state, action) => {
      const { option, value } = action.payload;
      state.value[option] = value;
    },
  },
});

export const { updateValue } = optionSlice.actions;

export default optionSlice.reducer;
