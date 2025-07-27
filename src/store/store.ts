import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import authReducer from "./authSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});
// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
