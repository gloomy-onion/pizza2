import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import cartHeader from '../../assets/cartHeader.svg';
import pizzaLogo from '../../assets/pizzaLogo.svg';
import { selectCart } from '../../redux/Slices/cartSlice';
import { Search } from '../index';

export const Header: React.FC = () => {
  const { totalPrice, totalCount, cartItems } = useSelector(selectCart);
  const location = useLocation();
  const isMounted = React.useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const cartPizzas = JSON.stringify(cartItems);
      localStorage.setItem('cart', cartPizzas);
    }
    isMounted.current = true;
  }, [cartItems]);

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link to={'/'}>
          <div className={styles.headerLogo}>
            <img src={pizzaLogo} alt={'Pizza logo'} />
            <div>
              <h1 className={styles.headerName}>React Pizza</h1>
              <p className={styles.headerDescription}>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
        <Search />
        <div className={styles.headerCart}>
          {location.pathname !== '/cart' && (
            <Link to={'/cart'} className={styles.button}>
              <span>{totalPrice} ₽</span>
              <div className={styles.button__delimiter} />
              <img src={cartHeader} alt={'cart'} />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
