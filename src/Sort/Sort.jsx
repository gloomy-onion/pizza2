import React, {useState} from 'react';
import styles from './Sort.module.scss';
import {sortList} from './constants';

const Sort = (props) => {
  const {sortType, onChangeSort} = props;

  const [open, setOpen] = useState(false);

  const onClickList = (i) => {
    onChangeSort(i);
    setOpen(false);
  };

  return (
    <div className={styles.sort}>
      <div className={styles.sort__label}>
        <div className={styles.sortLabel}/>
        <b>Сортировка по: </b>
        <span onClick={() => setOpen(!open)}>{sortType.name}</span>
      </div>
      {open && <div className={styles.sort__popup}>
        <ul>
          {sortList.map((sortItem, i) => (
            <li key={i} onClick={() => onClickList(sortItem)}
                className={sortType.sortProperty === sortItem.sortProperty ? styles.active : ''}>{sortItem.name}</li>
          ))}
        </ul>
      </div>}
    </div>
  );
};

export default Sort;