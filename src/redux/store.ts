import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-cycle
import cart from './Slices/cartSlice';
// eslint-disable-next-line import/no-cycle
import filter from './Slices/filterSlice';
// eslint-disable-next-line import/no-cycle
import pizza from './Slices/pizzaSlice';

export const store = configureStore({
  reducer: { filter, cart, pizza },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();