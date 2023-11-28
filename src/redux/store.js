import {configureStore} from '@reduxjs/toolkit';

import cart from './Slices/cartSlice';
import filter from './Slices/filterSlice';
import pizza from './Slices/pizzaSlice';

export const store = configureStore({
  reducer: {filter, cart, pizza},
});
