import cn from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './Cart.module.scss';
import cartImage from '../../img/cartImage.svg';
import trashBin from '../../img/trashBin.svg';
import { clearItems, selectCart } from '../../redux/Slices/cartSlice';
import { CartEmpty, CartItemBlock } from '../index';

export const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { items, totalPrice, totalCount } = useSelector(selectCart);
  const onClickClear = () => {
    if (window.confirm('Очистить корзину?')) {
      dispatch(clearItems());
    }
  };
  if (!totalCount) {
    return <CartEmpty />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={cn(styles.container, styles.container__cart)}>
          <div className={styles.cart}>
            <div className={styles.cart__top}>
              <div className={styles.content__title}>
                <img src={cartImage} alt={'cartHeader'} />
                <h2>Корзина</h2>
              </div>
              <div className={styles.cart__clear} onClick={onClickClear}>
                <img src={trashBin} alt={'trashBin'} />
                <span>Очистить корзину</span>
              </div>
            </div>
            <div className={styles.content__items}>
              {items.map((item) => (
                <CartItemBlock key={item.id} {...item} />
              ))}
            </div>
            <div className={styles.cart__bottom}>
              <div className={styles.cart__bottom_details}>
                <span>
                  {' '}
                  Всего пицц: <b>{totalCount} шт.</b>{' '}
                </span>
                <span>
                  {' '}
                  Сумма заказа: <b>{totalPrice} ₽</b>{' '}
                </span>
              </div>
              <div className={styles.cart__bottom_buttons}>
                <Link to={'/'} className={cn(styles.button, styles.goBackBtn)}>
                  <span>Вернуться назад</span>
                </Link>
                <button className={cn(styles.button, styles.payBtn)}>
                  <span>Оплатить сейчас</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

