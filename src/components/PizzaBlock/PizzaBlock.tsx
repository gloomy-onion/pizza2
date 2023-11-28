import React, {useState} from 'react';
import styles from './PizzaBlock.module.scss';
import cn from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, selectCartItemById} from '../../redux/Slices/cartSlice';
import {Link} from 'react-router-dom';

type PizzaBlockProps = {id: string,
  title:string,
  price:number,
  imageUrl:string,
  sizes:number[],
  types:number[],
  pizza: object}

const PizzaBlock: React.FC = (props) => {
  const {id, title, price, imageUrl, sizes, types, pizza} = props;
  const dispatch = useDispatch();
  const cartItem = useSelector(selectCartItemById(id));
  const typeNames = ['тонкое', 'традиционное'];
  const [activeType, setActiveType] = useState<number>(0);
  const [activeSize, setActiveSize] = useState<number>(0);
  const addedCount = cartItem ? cartItem.count : 0;
  const onClickAdd = () => {
    const item = {
      id, title, price, imageUrl, type: typeNames[activeType], size: sizes[activeSize]
    };
    dispatch(addItem(item));
  };

  return (
    <div className={styles.pizzaBlock}>
      <Link to={`pizza/${pizza.id}`}>
        <img
          className={styles.pizzaBlock__image}
          src={imageUrl}
          alt={'Pizza'}
        />
        <h4 className={styles.pizzaBlock__title}>{title}</h4>
      </Link>
      <div className={styles.pizzaBlock__selector}>
        <ul>
          {types.map((type) => (
            <li key={type} onClick={() => setActiveType(type)}
                className={activeType === type ? styles.active : ''}>{typeNames[type]}</li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li key={size} onClick={() => setActiveSize(i)}
                className={activeSize === i ? styles.active : ''}>{size} см.</li>))}
        </ul>
      </div>
      <div className={styles.pizzaBlock__bottom}>
        <div className={styles.pizzaBlock__price}>{price} ₽</div>
        <button onClick={onClickAdd} className={cn(styles.button, styles.button__outline, styles.button__add)}>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};

export default PizzaBlock;