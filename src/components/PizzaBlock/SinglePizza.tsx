import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import styles from './PizzaBlock.module.scss';
import { API_URL } from '../../common/constants';

export const SinglePizza = () => {
  const { id } = useParams();
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>({
    imageUrl: '',
    title: '',
    price: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`${API_URL}pizza/${id}`);
        setPizza(data);
      } catch (error) {
        alert('Ошибка');
        navigate('/');
      }
    };
    fetchPizza();
  }, []);

  if (!pizza) {
    return <div className={styles.loader}/>;
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt={'Pizza im'} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
      <Link to="/" className={styles.button}>
        <span>Вернуться назад</span>
      </Link>
    </div>
  );
};