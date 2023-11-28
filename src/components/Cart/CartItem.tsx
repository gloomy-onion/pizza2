import React from 'react';
import styles from './Cart.module.scss';
import {useDispatch} from 'react-redux';
import {addItem, minusItem, removeItem} from '../../redux/Slices/cartSlice';

type CartItemProps = {
  imageUrl: string,
  id: string,
  title: string,
  price: number,
  count: number,
  type: string,
  size: number
}

const CartItem: React.FC<CartItemProps> = (props) => {
  const {imageUrl, id, title, price, count, type, size} = props;
  const dispatch = useDispatch();
  const onClickPlus = () => {
    dispatch(addItem({id}));
  };
  const onClickMinus = () => {
    dispatch(minusItem({id}));
  };
  const onClickRemove = () => {
    if (window.confirm('Вы уверены что хотите удалить?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div className={styles.cart__item}>
      <div className={styles.cart__item__img}>
        <img src={imageUrl} alt={''}/>
      </div>
      <div className={styles.cart__item__info}>
        <h3>{title}</h3>
        <p>{type}, {size} см.</p>
      </div>
      <div className={styles.cart__item__count}>
        <button
          disabled={count === 1}
          onClick={onClickMinus}
          className={styles.minusBtn}>
        </button>
        {count}
        <button
          onClick={onClickPlus}
          className={styles.plusBtn}>
        </button>
      </div>
      <div className={styles.cart__item__price}>
        <b>{price * count} ₽</b>
      </div>
      <div className={styles.cart__item__remove}>
        <button onClick={onClickRemove} className={styles.removeBtn}>
        </button>
      </div>
    </div>
  );
};
export default CartItem;