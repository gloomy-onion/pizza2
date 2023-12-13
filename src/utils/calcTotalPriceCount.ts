
import { CartItem } from '../redux/Slices/cartSlice';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};

export const calcTotalCount = (items: CartItem[]) => {
  return items.reduce((sum, item) => sum + item.count, 0);
};
