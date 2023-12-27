import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import cart from './Slices/cartSlice';
import filter from './Slices/filterSlice';
import pizza from './Slices/pizzaSlice';

export const store = configureStore({
  reducer: { filter, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();