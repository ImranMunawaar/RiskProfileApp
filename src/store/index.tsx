import { configureStore } from '@reduxjs/toolkit';
import questionnaireReducer from './questionnaireSlice';

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
