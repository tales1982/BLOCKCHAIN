// frontend/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';

// Cria o store com Redux Toolkit. Thunk já está incluso por padrão.
export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
