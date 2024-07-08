import { configureStore } from "@reduxjs/toolkit";
import { pictureApi } from "./rtk/picture.api";
import { setupListeners } from "@reduxjs/toolkit/query";
import filterReducer from "./filter/flterSlice";

export const store = configureStore({
  reducer: {
    [pictureApi.reducerPath]: pictureApi.reducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pictureApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
