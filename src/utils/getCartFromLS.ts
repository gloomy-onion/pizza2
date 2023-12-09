import { calcTotalCount, calcTotalPrice } from './calcTotalPriceCount';
import { CartItem } from '../redux/Slices/cartSlice';

export const getCartFromLS = () => {
  const data = localStorage.getItem('cart');
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);
  const totalCount = calcTotalCount(items);

  return {
    items: items as CartItem[],
    totalPrice,
    totalCount,
  };
};
