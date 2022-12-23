import { configureStore } from "@reduxjs/toolkit";
import entityReducer from './reducers/entity';

export const store = configureStore({
  reducer: {
    entities: entityReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;