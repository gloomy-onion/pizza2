import { calcTotalCount, calcTotalPrice } from './calcTotalPriceCount';
import { CartItem } from '../redux/Slices/cartSlice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const cartItems: CartItem[] = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(cartItems);
  const totalCount = calcTotalCount(cartItems);

  return {
    cartItems,
    totalPrice,
    totalCount,
  };
};
