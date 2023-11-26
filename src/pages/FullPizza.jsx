import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {API_URL} from '../common/constants';

const FullPizza = () => {
  const {id} = useParams();
  const [pizza, setPizza] = useState();
  useEffect(() => {

    async function fetchPizza() {
      try {
        const {data} = await axios.get(`${API_URL}pizza/` + id);
        setPizza(data);
        console.log(data);
      } catch (error) {
        alert('Ошибка');
      }
    }
    fetchPizza();
  }, []);

  if(!pizza) {
    return 'Загрузка...'
  }

  return (
    <div>
      <img src={pizza.imageUrl} alt={'Pizza im'}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};

export default FullPizza;