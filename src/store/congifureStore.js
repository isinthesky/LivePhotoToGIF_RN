import { combineReducers, configureStore } from "@reduxjs/toolkit";

import optionReducer from "../features/reducers/optionSlice.js";
import contentReducer from "../features/reducers/contentSlice";

const rootReducer = combineReducers({
  optionReducer,
  contentReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
