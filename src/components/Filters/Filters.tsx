import React from 'react';

import styles from './Filters.module.scss';

type CategoriesProps = {
  value: number;
  onClickCategory: (id: number) => void;
};

const Filters: React.FC<CategoriesProps> = (props) => {
  const { value, onClickCategory } = props;

  const categories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className={styles.categories}>
      <ul>
        {categories.map((categoryName, i) => (
          <li key={i} onClick={() => onClickCategory(i)} className={value === i ? styles.active : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filters;
