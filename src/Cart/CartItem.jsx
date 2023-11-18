import React from 'react';
import styles from './Cart.module.scss'

const CartItem = (props) => {

  const {imageUrl} = props;
  return (

    <div className={styles.cart__item}>
      <div className={styles.cart__item__img}>
        <img  src={imageUrl} alt={''}/>
      </div>
      <div className={styles.cart__item__info}>
        <h3>Название пиццы</h3>
        <p>
          тип, 25 см.
        </p>
      </div>
      <div className={styles.cart__item__count}>
        <button
          // disabled={count === 1}
          // onClick={onClickMinus}
          className={styles.minusBtn}>
        </button>
        {1}
        <button
          // onClick={onClickPlus}
          className={styles.plusBtn}>
        </button>
      </div>
      <div className={styles.cart__item__price}>
        <b>цена</b>
      </div>
      <div className={styles.cart__item__remove}>
        <button className={styles.removeBtn}>
        </button>
      </div>
    </div>);
};
export default CartItem;