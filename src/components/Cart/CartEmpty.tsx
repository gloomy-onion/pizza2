import React from 'react';
import styles from './Cart.module.scss'
import {Link} from 'react-router-dom';
import cartEmptyImg from '../../img/cartEmptyImg.png'
import cn from 'classnames';

const CartEmpty = () => {
  return (
    <div className={styles.cart__empty}>
      <h2>
        Корзина пустая <span>😕</span>
      </h2>
      <p>
        Вероятней всего, вы не заказывали ещё пиццу.
        <br/>
        Для того, чтобы заказать пиццу, перейди на главную страницу.
      </p>
      <img src={cartEmptyImg} alt={"Empty cart"} />
      <Link to="/" className={cn(styles.button__black, styles.button)}>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};

export default CartEmpty;