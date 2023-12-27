import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { calcTotalCount, calcTotalPrice } from '../../utils/calcTotalPriceCount';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  cartItems: CartItem[];
  totalCount: number;
}

const { cartItems, totalPrice, totalCount } = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice,
  cartItems,
  totalCount,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.cartItems);
      state.totalCount = calcTotalCount(state.cartItems);
    },
    minusCartItem(state, action: PayloadAction<string>) {
      const findItem = state.cartItems.find((obj) => obj.id === action.payload);
      if (findItem && findItem.count > 1) {
        findItem.count--;
      }
      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalCount = state.cartItems.reduce((sum, item) => sum + item.count, 0);
    },
    removeCartItem(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((obj) => obj.id !== action.payload);
      state.totalPrice = state.cartItems.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
      state.totalCount = state.cartItems.reduce((sum, item) => sum + item.count, 0);
    },
    clearAllCartItems(state) {
      state.cartItems = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.cartItems.find((obj) => obj.id === id);

export const { addCartItem, removeCartItem, clearAllCartItems, minusCartItem } = cartSlice.actions;

export default cartSlice.reducer;
