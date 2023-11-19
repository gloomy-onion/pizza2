import React from 'react';
import styles from './Cart.module.scss';
import cn from 'classnames';
import cartImage from '../img/cartImage.svg';
import trashBin from '../img/trashBin.svg';
import {Link} from 'react-router-dom';
import CartItem from './CartItem';
import {useDispatch, useSelector} from 'react-redux';
import {clearItems} from '../redux/Slices/cartSlice';
import CartEmpty from './CartEmpty';

const Cart = () => {
  const dispatch = useDispatch();
  const {items, totalPrice} = useSelector(state => state.cart);
  const onClickClear = () => {
    if (window.confirm('Очистить корзину?'))
      dispatch(clearItems);
  };
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  if (!totalCount) {
    return <CartEmpty/>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={cn(styles.container, styles.container__cart)}>
          <div className={styles.cart}>
            <div className={styles.cart__top}>
              <div className={styles.content__title}>
                <img src={cartImage} alt={'cartHeader'}/>
                <h2>Корзина</h2>
              </div>
              <div className={styles.cart__clear} onClick={onClickClear}>
                <img src={trashBin} alt={'trashBin'}/>
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className={styles.content__items}>
              {items.map((item) => (
                <CartItem key={item.id} {...item}/>
              ))}
            </div>
            <div className={styles.cart__bottom}>
              <div className={styles.cart__bottom_details}>
                <span> Всего пицц: <b>{totalCount} шт.</b> </span>
                <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
              </div>
              <div className={styles.cart__bottom_buttons}>
                <Link to={'/'} className={cn(styles.button, styles.goBackBtn)}>
                  <span>Вернуться назад</span>
                </Link>
                <div className={cn(styles.button, styles.payBtn)}>
                  <span>Оплатить сейчас</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;