import { configureStore,  } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice"

const store = configureStore({
    reducer: {
      userSlice: userSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false}),
  });

export default store;