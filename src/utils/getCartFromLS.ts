import { calcTotalCount, calcTotalPrice } from './calcTotalPriceCount';
import { CartItem } from '../redux/Slices/cartSlice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items: CartItem[] = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calcTotalCount(items);

  return {
    items,
    totalPrice,
    totalCount,
  };
};
